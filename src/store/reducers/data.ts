import { Reducer } from "redux";

import { dataActions, DataActionTypes } from "../actions/data";

import { NewsArticle } from "../../types/api-types";

export type DataState = {
  news: NewsArticle[] | [];
};

export const DEFAULT_STATE: DataState = {
  news: [],
};

export const data: Reducer<DataState, DataActionTypes> = (
  state = DEFAULT_STATE,
  action,
) => {
  switch (action.type) {
    case dataActions.fetchArticlesSuccess.type:
      return { ...state, news: action.payload };
    case dataActions.fetchArticlesFailure.type:
      return { ...state, news: [] };
  }
  return state;
};
