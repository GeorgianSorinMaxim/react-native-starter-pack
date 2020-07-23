import { put, all, call } from "redux-saga/effects";

import { ActionTypes } from "../actions/app";

import { _doGet } from "../../api/networkingApi";

import config from "../../../config/config.json";

export const getData = async (url: string) => {
  return _doGet(url);
};

export const fetchData = function* () {
  const fetchData = yield call(getData, config.API.dataURL);

  if (fetchData && fetchData.success) {
    yield put({
      type: ActionTypes.DATA_FETCHED_SUCCESS,
      payload: fetchData.payload
    });
  } else {
    yield put({
      type: ActionTypes.DATA_FETCHED_FAILURE,
      payload: []
    });
  }
};

export function* app() {
  yield all([
    call(fetchData),
  ]);
}
