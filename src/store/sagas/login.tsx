import { Alert } from "react-native";
import { put, all, call, takeEvery } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

import { ActionTypes } from "../actions/login";
import { ActionTypes as DataActionTypes } from "../actions/data";

import { firebaseApi } from "../../api/firebaseApi";

const onError = () => {
  // Remove the local storage items
  try {
    AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(`onError - error: ${error}`);
  }

  Alert.alert("Session expired", "Please login again", [{ text: "OK", onPress: () => {} }], { cancelable: false });
};

export const onLogin = function* (action) {
  try {
    const res = yield call(firebaseApi.login, action.email, action.password);
    const token = yield firebaseApi.getToken();

    if (res && res.id) {
      try {
        yield AsyncStorage.setItem("token", token);
      } catch (error) {
        console.log("-- onLogin - AsyncStorage.set error: ", error);
      }

      yield put({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: res,
      });

      yield put({
        type: DataActionTypes.DATA_FETCHED_START,
      });
    } else {
      yield put({
        type: ActionTypes.LOGIN_FAILURE,
        payload: res,
      });
    }
  } catch (error) {
    console.log("-- onLogin:", error);
  }
};

export const onLogout = function* () {
  try {
    const res = yield firebaseApi.logout();

    try {
      yield AsyncStorage.removeItem("token");
    } catch (error) {
      console.log("-- onLogout: AsyncStorage.removeItem error: ", error);
    }

    if (res === "DONE") {
      yield put({
        type: ActionTypes.LOGOUT_SUCCESS,
      });
    } else {
      yield put({
        type: ActionTypes.LOGOUT_FAILURE,
        payload: res,
      });
    }
  } catch (error) {
    console.log("-- onLogout:", error);
  }
};

// Fetch the token and check if it is still valid
export const onVerifyToken = function* () {
  yield put({
    type: ActionTypes.VERIFY_TOKEN_START,
  });

  try {
    // Get token from AsyncStorage
    const token = yield AsyncStorage.getItem("token");

    if (token) {
      const decodedToken: { exp: number } = jwt_decode(token);
      if (decodedToken && decodedToken.exp) {
        // Convert Unix Timestamp to Milliseconds
        const expDate = DateTime.fromMillis(decodedToken.exp * 1000);
        // Check JWT token validity
        const diff = expDate.diffNow("minutes");
        const { values } = diff;
        const { minutes } = values;

        if (minutes > 0) {
          // Auto-redirect if the token is valid
          yield put({
            type: ActionTypes.VERIFY_TOKEN_SUCCESS,
            payload: { token, expDate },
          });
          // RootNavigation.push("Tabs", { screen: "Calendar" });
        } else {
          onError();
          yield put({
            type: ActionTypes.VERIFY_TOKEN_FAILURE,
            payload: { error: `Token expired!` },
          });
        }
      } else {
        yield put({
          type: ActionTypes.VERIFY_TOKEN_FAILURE,
          payload: { error: `No decoded token` },
        });
      }
    } else {
      console.log(`onVerifyToken - no token`);
      yield put({
        type: ActionTypes.VERIFY_TOKEN_FAILURE,
        payload: { error: `No token returned` },
      });
    }
  } catch (error) {
    console.log(`onVerifyToken error: ${error}`);
    onError();
    yield put({
      type: ActionTypes.VERIFY_TOKEN_FAILURE,
      payload: { error: `onVerifyToken - AsyncStorage.getItem ${error}` },
    });
  }
};

export const onValidateToken = function* () {
  try {
    // Get token from AsyncStorage
    const token = yield AsyncStorage.getItem("token");

    console.log("** token", token);

    if (token) {
      // Check JWT token validity
      const decodedToken: { exp: number } = jwt_decode(token);
      if (decodedToken && decodedToken.exp) {
        // Convert Unix Timestamp to Milliseconds
        const expDate = DateTime.fromMillis(decodedToken.exp * 1000);
        // Check JWT token validity
        const diff = expDate.diffNow("minutes");
        const { values } = diff;
        const { minutes } = values;

        if (minutes > 0) {
          yield put({
            type: ActionTypes.VALIDATE_TOKEN_SUCCESS,
            payload: { token, expDate },
          });
        } else {
          onError();

          yield put({
            type: ActionTypes.LOGOUT_START,
          });

          yield put({
            type: ActionTypes.VALIDATE_TOKEN_FAILURE,
            payload: { error: `Token expired!` },
          });
        }
      } else {
        onError();

        yield put({
          type: ActionTypes.LOGOUT_START,
        });

        yield put({
          type: ActionTypes.VALIDATE_TOKEN_FAILURE,
          payload: { error: `No decoded token` },
        });
      }
    } else {
      onError();

      yield put({
        type: ActionTypes.LOGOUT_START,
      });

      yield put({
        type: ActionTypes.VALIDATE_TOKEN_FAILURE,
        payload: { error: `No token` },
      });
    }
  } catch (error) {
    yield put({
      type: ActionTypes.VALIDATE_TOKEN_FAILURE,
      payload: { error: `AsyncStorage.getItem - ${error}` },
    });
  }
};

export function* login() {
  yield all([
    // Verify token at app startup
    call(onVerifyToken),
    takeEvery(ActionTypes.LOGIN_START, onLogin),
    takeEvery(ActionTypes.LOGIN_FAILURE, onLogout),
    takeEvery(ActionTypes.LOGOUT_START, onLogout),
    // Validate token at app state change
    takeEvery(ActionTypes.VALIDATE_TOKEN_START, onValidateToken),
  ]);
}
