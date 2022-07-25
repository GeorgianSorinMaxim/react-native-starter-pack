import { all } from "redux-saga/effects";

import { dataSaga } from "./data";
import { authSaga } from "./auth";

export function* rootSaga() {
  yield all([authSaga(), dataSaga()]);
}
