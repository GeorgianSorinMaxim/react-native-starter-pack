import { put, all, call, takeEvery } from "redux-saga/effects";

import { ActionTypes } from "../actions/login";

import { firebaseApi } from "../../api/firebaseApi";

export const onLogin = function* (action) {
  const res = yield call(firebaseApi.login, action.email, action.password);

  if (res && res.id) {
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: res
    });
  } else {
    yield put({
      type: ActionTypes.LOGIN_FAILURE,
      payload: res
    });
  }
};

export const onLogout = function*() {
  const res = yield firebaseApi.logout();

  if (res === "DONE") {
    yield put({
      type: ActionTypes.LOGOUT_SUCCESS
    });
  } else {
    yield put({
      type: ActionTypes.LOGOUT_FAILURE,
      payload: res
    });
  }
};

export function* login() {
  yield all([
    takeEvery(ActionTypes.LOGIN_START, onLogin),
    takeEvery(ActionTypes.LOGIN_FAILURE, onLogout),
    takeEvery(ActionTypes.LOGOUT_START, onLogout),
  ]);
}
