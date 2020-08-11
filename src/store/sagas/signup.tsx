import { put, all, call, takeEvery } from "redux-saga/effects";

import { ActionTypes } from "../actions/signup";

import { firebase } from "../../../firebase/config";

const onRegister = async (firstName, lastName, email, password) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        firstName,
        lastName,
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          alert("Your user has been created");
        })
        .catch((error) => {
          alert(error);
          return error;
        });
      return data;
    })
    .catch((error) => {
      alert(error);
      return error;
    });

export const register = function* (action) {
  const res = yield call(onRegister, action.firstName, action.lastName, action.email, action.password);

  if (res && res.id) {
    yield put({
      type: ActionTypes.REGISTRATION_SUCCESS,
      payload: res,
    });
  } else {
    yield put({
      type: ActionTypes.REGISTRATION_FAILURE,
      payload: res,
    });
  }
};

export function* signup() {
  yield all([takeEvery(ActionTypes.REGISTRATION_START, register)]);
}
