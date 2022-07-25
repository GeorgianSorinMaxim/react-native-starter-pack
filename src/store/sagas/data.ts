import { put, all, call, takeEvery } from "redux-saga/effects";
import Config from "react-native-config";

import { dataActions } from "../actions/data";

import { _doGet } from "../../api/networkingApi";

import { University } from "../reducers/data";

type Response = {
  payload: University[];
  success?: boolean;
};

export const fetchUniversitiesData = async (url: string): Promise<unknown> =>
  _doGet(url);

export const onFetchData = function* () {
  try {
    const fetchData: Response = yield call(
      fetchUniversitiesData,
      Config.API_URL,
    );

    if (fetchData && fetchData.success) {
      yield put(dataActions.fetchDataSuccess(fetchData.payload));
    } else {
      yield put(dataActions.fetchDataFailure([]));
    }
  } catch (error) {
    console.log("onFetchData error:", error);
    yield put(dataActions.fetchDataFailure([]));
  }
};

export function* dataSaga() {
  yield all([
    call(onFetchData),
    takeEvery(dataActions.fetchDataStart.type, onFetchData),
  ]);
}
