import { put, all, call } from "redux-saga/effects";
import Config from "react-native-config";

import { dataActions } from "../actions/data";

import { _doGet } from "../../api/networkingApi";

import { NewsArticle, University } from "../reducers/data";

type NewsResponse = {
  payload: {
    articles: NewsArticle[];
  };
  success?: boolean;
};

type UniversitiesResponse = {
  payload: University[];
  success?: boolean;
};

export const fetchNewsArticles = async (url: string): Promise<unknown> => {
  const headers = {
    "x-api-key": Config.NEWSCATCHER_API_KEY,
  };

  return _doGet(url, headers);
};

export const fetchUniversitiesData = async (url: string): Promise<unknown> =>
  _doGet(url);

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
    console.log("onFetchNewsArticles error:", error);
    yield put(dataActions.fetchArticlesFailure());
  }
};

export const onFetchUniversityList = function* () {
  try {
    const fetchData: UniversitiesResponse = yield call(
      fetchUniversitiesData,
      Config.UNIVERSITIES_API_URL,
    );

    if (fetchData && fetchData.success) {
      yield put(dataActions.fetchUniversitiesSuccess(fetchData.payload));
    } else {
      yield put(dataActions.fetchUniversitiesFailure());
    }
  } catch (error) {
    console.log("onFetchUniversityList error:", error);
    yield put(dataActions.fetchUniversitiesFailure());
  }
};

export function* dataSaga() {
  yield all([call(onFetchNewsArticles), call(onFetchUniversityList)]);
}
