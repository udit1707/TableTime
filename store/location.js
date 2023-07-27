import secureLocalStorage from "react-secure-storage";

const GET_LOCATION_INIT = "GET_LOCATION_INIT";
const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
const GET_LOCATION_ERROR = "GET_LOCATION_ERROR";
const UPDATE_LOCATION = "UPDATE_LOCATION";

export const getLocation = () => {
  return async (dispatch, getState) => {
    const location = getState().location.currentLocation;

    if (location) return;

    dispatch({
      type: GET_LOCATION_INIT,
    });

    try {
      navigator.geolocation.getCurrentPosition((pos) => {
        const currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        secureLocalStorage.setItem('defaultAddress', JSON.stringify(currentLocation));

        dispatch({
          type: GET_LOCATION_SUCCESS,
          payload: currentLocation,
        });
      });
    } catch (err) {
      dispatch({
        type: GET_LOCATION_ERROR,
        payload: {
          error,
        },
      });
    }
  };
};

export const updateLocation = (location) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_LOCATION,
      payload: location,
    });
  };
};

const initialState = {
  isLoading: false,
  currentLocation: null,
  defaultPosition: null,
  loadError: null,
};

export const locationReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_INIT:
      return {
        ...state,
        isLoading: true,
        loadError: null,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadError: null,
        currentLocation: { ...action.payload },
        defaultPosition: { ...action.payload }
      };
    case GET_LOCATION_ERROR:
      return {
        ...state,
        currentLocation: null,
        defaultPosition: null,
        loadError: action.payload.error,
        isLoading: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        currentLocation: { ...action.payload },
      };
    default:
      return { ...state };
  }
};
