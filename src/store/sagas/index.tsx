import { all } from "redux-saga/effects";

import { app } from "./app";

export function* rootSaga() {
  yield all([app()]);
}
