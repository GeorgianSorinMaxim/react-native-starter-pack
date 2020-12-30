import { put, all, call, takeEvery } from "redux-saga/effects";
import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";

import { ActionTypes } from "../actions/signup";

import { firebase } from "../../../firebase";

import { navigate } from "../../navigation/RootNavigation";

const onRegister = async (firstName, lastName, email, password) => {
  try {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const platform = DeviceInfo.getSystemName();
        const version = DeviceInfo.getVersion();
        const osVersion = DeviceInfo.getSystemVersion();
        const createdAt = new Date();

        const data = {
          id: uid,
          email,
          firstName,
          lastName,
          uuid: uuid.v1(),
          platform,
          version,
          osVersion,
          createdAt,
        };
        const usersRef = firebase.firestore().collection("users");
        return usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            alert("Your user has been created");
            return data;
          })
          .catch((error) => {
            alert(error);
            return error;
          });
      })
      .catch((error) => {
        alert(error);
        return error;
      });
  } catch (error) {
    console.log("-- onRegister:", error);
  }
};

export const register = function* (action) {
  try {
    const res = yield onRegister(action.firstName, action.lastName, action.email, action.password);

    if (res && res.id) {
      yield put({
        type: ActionTypes.REGISTRATION_SUCCESS,
        payload: res,
      });
      yield call(navigate, "Login", {});
    } else {
      yield put({
        type: ActionTypes.REGISTRATION_FAILURE,
        payload: res,
      });
    }
  } catch (error) {
    console.log("-- register:", error);
  }
};

export function* signup() {
  yield all([takeEvery(ActionTypes.REGISTRATION_START, register)]);
}
