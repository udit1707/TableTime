import { combineReducers } from "@reduxjs/toolkit";
import { getDistance } from "geolib";
import { outlets } from "@/utils/outlets";

const GET_OUTLET_DATA_INIT = "GET_OUTLET_DATA_INIT";
const GET_OUTLET_DATA_SUCCESS = "GET_OUTLET_DATA_SUCCESS";
const GET_OUTLET_DATA_ERROR = "GET_OUTLET_DATA_ERROR";
const FILTER_OUTLETS = "FILTER_OUTLETS";

export const getOutlets = (currentLocation) => {
  return async (dispatch, getState) => {
    const userListCached = getState().outlets.list.length > 0;

    if (userListCached || getState().outlets.isLoading) return;

    dispatch({
      type: GET_OUTLET_DATA_INIT,
    });

    try {
      const newOutlets = [...outlets];

      outlets.forEach((i, index) => {
        console.log(currentLocation);
        console.log(currentLocation.coords);

        const distance = getDistance(
          {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
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
          error,
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

const initialState = {
  isLoading: false,
  list: [],
  queryList: [],
  loadError: null,
};

const outletReducer = function (state = initialState, action) {
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
      };
    case GET_OUTLET_DATA_ERROR:
      return {
        ...state,
        list: [],
        queryList: [],
        loadError: action.payload.error,
        isLoading: false,
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

const rootReducer = combineReducers({
  outlets: outletReducer,
});

export default rootReducer;
