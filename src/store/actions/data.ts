import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

import { NewsArticle } from "../../types/api-types";

export const dataActions = {
  fetchArticlesStart: actionCreator("ARTICLES_FETCH_START"),
  fetchArticlesSuccess: actionCreatorWithPayload(
    "ARTICLES_FETCH_SUCCESS",
    payloadType<NewsArticle[]>(),
  ),
  fetchArticlesFailure: actionCreator("ARTICLES_FETCH_FAILURE"),
};

export type FetchArticleDataStart = ReturnType<
  typeof dataActions.fetchArticlesStart
>;
export type FetchArticleDataSuccess = ReturnType<
  typeof dataActions.fetchArticlesSuccess
>;
export type FetchArticleDataFailure = ReturnType<
  typeof dataActions.fetchArticlesFailure
>;

export type DataActionTypes =
  | FetchArticleDataStart
  | FetchArticleDataSuccess
  | FetchArticleDataFailure;
