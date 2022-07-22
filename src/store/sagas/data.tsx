import { put, all, call, takeEvery } from "redux-saga/effects";
import Config from "react-native-config";

import { dataActions } from "../actions/data";

import { _doGet } from "../../api/networkingApi";

import { University } from "../reducers/data";

type Response = {
  payload: University[];
  success?: boolean;
};

export const getData = async (url: string): Promise<unknown> => {
  return _doGet(url);
};

export const fetchData = function* () {
  try {
    const fetchData: Response = yield call(getData, Config.API_URL);

    if (fetchData && fetchData.success) {
      yield put(dataActions.fetchDataSuccess(fetchData.payload));
    } else {
      yield put(dataActions.fetchDataFailure([]));
    }
  } catch (error) {
    console.log("fetchData error:", error);
  }
};

export function* dataSaga() {
  yield all([
    call(fetchData),
    takeEvery(dataActions.fetchDataStart.type, fetchData),
  ]);
}
