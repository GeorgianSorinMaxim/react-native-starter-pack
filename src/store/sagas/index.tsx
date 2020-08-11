import { all } from "redux-saga/effects";

import { data } from "./data";
import { login } from "./login";
import { signup } from "./signup";

export function* rootSaga() {
  yield all([login(), signup(), data()]);
}
