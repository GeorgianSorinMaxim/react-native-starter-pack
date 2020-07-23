// TODO: In production use createSelector for Memoized Selectors
// import { createSelector } from "reselect";

import { RootState } from "../types/state";

export const getRestaurants = (state: RootState) =>
  state.app &&
  state.app.data &&
  state.app.data.data &&
  state.app.data.data.restaurant &&
  state.app.data.data.restaurant.items ? state.app.data.data.restaurant.items : [];


