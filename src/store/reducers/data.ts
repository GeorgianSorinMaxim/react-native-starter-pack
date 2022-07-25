import { Reducer } from "redux";

import { dataActions, DataActionTypes } from "../actions/data";

export type University = {
  name: string;
  url: string;
  imageUrl?: string;
  geo?: {
    address: {
      streetAddress: string;
      postalCode: string;
      addressLocality: string;
    };
  };
};

export type NewsArticle = {
  _id: string;
  _score: number;
  author: string;
  authors: string;
  clean_url: string;
  country: string;
  excerpt: string;
  is_opinion: boolean;
  language: string;
  link: string;
  media: string;
  published_date: string;
  published_date_precision: string;
  rank: number;
  rights: string;
  summary: string;
  title: string;
  topic: string;
  twitter_account: string;
};

export type DataState = {
  news: NewsArticle[] | [];
  universities: University[] | [];
};

export const DEFAULT_STATE: DataState = {
  news: [],
  universities: [],
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
  switch (action.type) {
    case dataActions.fetchUniversitiesSuccess.type:
      return { ...state, universities: action.payload };
    case dataActions.fetchUniversitiesFailure.type:
      return { ...state, universities: [] };
  }
  return state;
};
