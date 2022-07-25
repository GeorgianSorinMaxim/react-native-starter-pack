// TODO: In production use createSelector for Memoized Selectors
// import { createSelector } from "reselect";

import { RootState } from "../reducers/root-reducer-factory";

export const getNewsArticles = (state: RootState) =>
  state.data && state.data.news ? state.data.news : [];

export const getUniversities = (state: RootState) =>
  state.data && state.data.universities ? state.data.universities : [];
