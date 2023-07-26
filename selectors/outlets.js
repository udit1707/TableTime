import { createSelector } from "reselect";

const baseState = (state) => state.outlets;

export const outletLoaderSelector = createSelector(baseState, (state) => ({
  isLoading: state.isLoading,
  loadError: state.loadError,
}));

export const outletDataSelector = createSelector(baseState, (state) => ({
  list: state.list,
  queryList: state.queryList,
}));
