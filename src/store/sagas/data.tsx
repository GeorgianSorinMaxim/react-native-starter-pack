import { put, all, call, takeEvery } from "redux-saga/effects";

import { ActionTypes } from "../actions/data";

import { _doGet } from "../../api/networkingApi";

import config from "../../../config/config.json";

export const getData = async (url: string) => {
  return _doGet(url);
};

export const fetchData = function* () {
  try {
    const fetchData = yield call(getData, config.API.dataURL);

    if (fetchData && fetchData.success) {
      yield put({
        type: ActionTypes.DATA_FETCHED_SUCCESS,
        payload: fetchData.payload,
      });
    } else {
      yield put({
        type: ActionTypes.DATA_FETCHED_FAILURE,
        payload: [],
      });
    }
  } catch (error) {
    console.log("-- fetchData:", error);
  }
};

export function* data() {
  yield all([call(fetchData), takeEvery(ActionTypes.DATA_FETCHED_START, fetchData)]);
}
