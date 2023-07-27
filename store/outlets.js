import { getOutletsFromFirestore } from "@/api/outlets";
import { getDistance } from "geolib";

const GET_OUTLET_DATA_INIT = "GET_OUTLET_DATA_INIT";
const GET_OUTLET_DATA_SUCCESS = "GET_OUTLET_DATA_SUCCESS";
const GET_OUTLET_DATA_ERROR = "GET_OUTLET_DATA_ERROR";
const FILTER_OUTLETS = "FILTER_OUTLETS";
const UPDATE_OUTLET_DISTANCE = "UPDATE_OUTLET_DISTANCE";

export const getOutlets = (currentLocation) => {
  return async (dispatch, getState) => {
    const userListCached = getState().outlets.list.length > 0;

    if (userListCached || getState().outlets.isLoading) return;

    dispatch({
      type: GET_OUTLET_DATA_INIT,
    });

    try {
      const outlets = await getOutletsFromFirestore();
      const newOutlets = [...outlets];

      outlets.forEach((i, index) => {
        const distance = getDistance(
          {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          },
          {
            ...i.location,
          }
        );
        newOutlets[index].distance = distance;
      });

      dispatch({
        type: GET_OUTLET_DATA_SUCCESS,
        payload: newOutlets,
      });
    } catch (err) {
      dispatch({
        type: GET_OUTLET_DATA_ERROR,
        payload: {
          err,
        },
      });
    }
  };
};

export const setFilteredOutlets = (filteredOutlets) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_OUTLETS,
      payload: {
        queryList: filteredOutlets,
      },
    });
  };
};

export const updateOutletDistance = (currentLocation) => {
  return async (dispatch, getState) => {
    const outlets = getState().outlets.outlets;
    const newOutlets = [...outlets];

    outlets.forEach((i, index) => {
      const distance = getDistance(
        {
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
        },
        {
          ...i.location,
        }
      );
      newOutlets[index].distance = distance;
    });

    dispatch({
      type: UPDATE_OUTLET_DISTANCE,
      payload: newOutlets,
    });
  };
};

const initialState = {
  outlets: [],
  isLoading: false,
  list: [],
  queryList: [],
  loadError: null,
};

export const outletReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_OUTLET_DATA_INIT:
      return {
        ...state,
        isLoading: true,
        loadError: null,
      };
    case GET_OUTLET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadError: null,
        list: [...action.payload],
        queryList: [...action.payload],
        outlets: [...action.payload],
      };
    case GET_OUTLET_DATA_ERROR:
      return {
        ...state,
        list: [],
        queryList: [],
        outlets: [],
        loadError: action.payload.err,
        isLoading: false,
      };
    case UPDATE_OUTLET_DISTANCE:
      return {
        ...state,
        list: [...action.payload],
        queryList: [...action.payload],
      };
    case FILTER_OUTLETS:
      return {
        ...state,
        queryList: [...action.payload.queryList],
      };

    default:
      return { ...state };
  }
};
