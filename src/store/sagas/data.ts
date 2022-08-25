import { put, all, call } from "redux-saga/effects";
import Config from "react-native-config";

import { dataActions } from "../actions/data";

import { makeGetRequest } from "../../api/networkingApi";

import { NewsArticle } from "../../types/api-types";

import { logError } from "../../api/logger";

type NewsResponse = {
  payload: {
    articles: NewsArticle[];
  };
  success?: boolean;
};

export const fetchNewsArticles = async (url: string): Promise<unknown> => {
  const headers = {
    "x-api-key": Config.NEWSCATCHER_API_KEY,
  };

  return makeGetRequest(url, headers);
};

export const onFetchNewsArticles = function* () {
  try {
    const fetchData: NewsResponse = yield call(
      fetchNewsArticles,
      Config.NEWSCATCHER_API_URL,
    );

    if (fetchData && fetchData.success) {
      yield put(dataActions.fetchArticlesSuccess(fetchData.payload.articles));
    } else {
      yield put(dataActions.fetchArticlesFailure());
    }
  } catch (error) {
    logError("Data - onFetchNewsArticles", error);
    yield put(dataActions.fetchArticlesFailure());
  }
};

export function* dataSaga() {
  yield all([call(onFetchNewsArticles)]);
}
