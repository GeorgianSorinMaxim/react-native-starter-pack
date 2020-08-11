// TODO: In production use createSelector for Memoized Selectors
// import { createSelector } from "reselect";

import { RootState } from "../types/state";

export const getRestaurants = (state: RootState) =>
  state.data &&
  state.data.data &&
  state.data.data.data &&
  state.data.data.data.restaurant &&
  state.data.data.data.restaurant.items
    ? state.data.data.data.restaurant.items
    : [];
