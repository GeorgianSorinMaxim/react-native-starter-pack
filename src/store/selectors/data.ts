import { RootState } from "../reducers/root-reducer-factory";

export const getNewsArticles = (state: RootState) =>
  state.data && state.data.news ? state.data.news : [];
