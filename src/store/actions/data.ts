import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

import { University, NewsArticle } from "../reducers/data";

export const dataActions = {
  fetchArticlesStart: actionCreator("ARTICLES_FETCH_START"),
  fetchArticlesSuccess: actionCreatorWithPayload(
    "ARTICLES_FETCH_SUCCESS",
    payloadType<NewsArticle[]>(),
  ),
  fetchArticlesFailure: actionCreator("ARTICLES_FETCH_FAILURE"),
  fetchUniversitiesStart: actionCreator("UNIVERSITIES_FETCH_START"),
  fetchUniversitiesSuccess: actionCreatorWithPayload(
    "UNIVERSITIES_FETCH_SUCCESS",
    payloadType<University[]>(),
  ),
  fetchUniversitiesFailure: actionCreator("UNIVERSITIES_FETCH_FAILURE"),
};

export type FetchDataStart = ReturnType<typeof dataActions.fetchArticlesStart>;
export type FetchDataSuccess = ReturnType<
  typeof dataActions.fetchArticlesSuccess
>;
export type FetchAdvertsFailure = ReturnType<
  typeof dataActions.fetchArticlesFailure
>;

export type FetchUniversitiesStart = ReturnType<
  typeof dataActions.fetchUniversitiesStart
>;
export type FetchUniversitiesSuccess = ReturnType<
  typeof dataActions.fetchUniversitiesSuccess
>;
export type FetchUniversitiesFailure = ReturnType<
  typeof dataActions.fetchUniversitiesFailure
>;

export type DataActionTypes =
  | FetchDataStart
  | FetchDataSuccess
  | FetchAdvertsFailure
  | FetchUniversitiesStart
  | FetchUniversitiesSuccess
  | FetchUniversitiesFailure;
