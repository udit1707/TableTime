import { createSelector } from "reselect";

const baseState = (state) => state.location;

export const locationLoaderSelector = createSelector(baseState, (state) => ({
  isLoading: state.isLoading,
  loadError: state.loadError,
}));

export const locationDataSelector = createSelector(baseState, (state) => ({
  currentLocation: state.currentLocation,
  defaultPosition: state.defaultPosition
}));
