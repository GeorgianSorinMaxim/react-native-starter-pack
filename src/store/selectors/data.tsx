// TODO: In production use createSelector for Memoized Selectors
// import { createSelector } from "reselect";

import { RootState } from "../types/state";

export const getRestaurants = (state: RootState) =>
  state.data && state.data.universities ? state.data.universities : [];
