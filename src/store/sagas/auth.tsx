import { Alert } from "react-native";
import { put, all, call, takeEvery } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

import { LoginStart, SignupStart, authActions } from "../actions/auth";
import { dataActions } from "../actions/data";

import {
  login,
  logout,
  register,
  getToken,
} from "../../api/auth/firebase-auth";

import { navigate } from "../../navigation/RootNavigation";

const onError = () => {
  // Remove the local storage items
  try {
    AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(`onError - error: ${error}`);
  }

  Alert.alert(
    "Session expired",
    "Please login again",
    [{ text: "OK", onPress: () => {} }],
    { cancelable: false },
  );
};

export const onLogin = function* (action: LoginStart) {
  const {
    payload: { email, password },
  } = action;

  try {
    const userPayload: Awaited<ReturnType<typeof login>> = yield call(
      login,
      email,
      password,
    );
    const token: string = yield getToken();

    if (token) {
      try {
        yield AsyncStorage.setItem("token", token);
      } catch (error) {
        console.log("onLogin - AsyncStorage.set error: ", error);
      }
    }

    if (userPayload && userPayload.user.uid) {
      yield put(authActions.loginSuccess({ user: userPayload }));

      yield put({
        type: dataActions.fetchDataStart.type,
      });
    } else {
      yield put(authActions.loginFailure());
    }
  } catch (error) {
    console.log("onLogin error:", error);
  }
};

export const onRegister = function* (action: SignupStart) {
  const {
    payload: { firstName, lastName, email, password },
  } = action;

  console.log(firstName, lastName, email, password);

  try {
    const res: Awaited<ReturnType<typeof register>> = yield call(
      register,
      firstName,
      lastName,
      email,
      password,
    );

    if (res && res.id) {
      yield put(authActions.signupSuccess(res));
      yield call(navigate, "Login", {});
    } else {
      yield put(authActions.signupFailure());
    }
  } catch (error) {
    console.log("onRegister error:", error);
  }
};

export const onLogout = function* () {
  try {
    const res: Awaited<ReturnType<typeof logout>> = yield logout();

    try {
      yield AsyncStorage.removeItem("token");
    } catch (error) {
      console.log("onLogout: AsyncStorage.removeItem error: ", error);
    }

    if (res) {
      yield put(authActions.logoutSuccess());
    } else {
      yield put(authActions.logoutFailure());
    }

    // Navigate to the login screen
    yield call(navigate, "Login", {});
  } catch (error) {
    console.log("onLogout error:", error);
  }
};

// Fetch the token and check if it is still valid
export const onVerifyToken = function* () {
  yield put(authActions.verifyTokenStart());

  try {
    // Get token from AsyncStorage
    const token: string = yield AsyncStorage.getItem("token");

    if (token) {
      const decodedToken: { exp: number } = jwt_decode(token);
      if (decodedToken && decodedToken.exp) {
        // Convert Unix Timestamp to Milliseconds
        const expDate = DateTime.fromMillis(decodedToken.exp * 1000);
        // Check JWT token validity
        const diff = expDate.diffNow("minutes");
        const { minutes } = diff;

        if (minutes > 0) {
          // Auto-redirect if the token is valid
          yield put(authActions.verifyTokenSuccess({ token, expDate }));
          // RootNavigation.push("Tabs", { screen: "Calendar" });
        } else {
          console.log("onVerifyToken - Token expired!");
          onError();
          yield put(authActions.logoutStart());
          yield put(authActions.verifyTokenFailure());
        }
      } else {
        console.log("onVerifyToken - No decoded token");

        yield put(authActions.verifyTokenFailure());
      }
    } else {
      console.log("onVerifyToken - No token returned");
      yield put(authActions.verifyTokenFailure());
    }
  } catch (error) {
    console.log("onVerifyToken - AsyncStorage.getItem error", error);

    onError();
    yield put(authActions.logoutStart());
    yield put(authActions.verifyTokenFailure());
  }
};

export const onValidateToken = function* () {
  try {
    // Get token from AsyncStorage
    const token: string = yield AsyncStorage.getItem("token");

    if (token) {
      // Check JWT token validity
      const decodedToken: { exp: number } = jwt_decode(token);
      if (decodedToken && decodedToken.exp) {
        // Convert Unix Timestamp to Milliseconds
        const expDate = DateTime.fromMillis(decodedToken.exp * 1000);
        // Check JWT token validity
        const diff = expDate.diffNow("minutes");
        const { minutes } = diff;

        if (minutes > 0) {
          yield put(authActions.verifyTokenSuccess({ token, expDate }));
        } else {
          console.log("Token expired!");
          onError();
          yield put(authActions.logoutStart());
          yield put(authActions.verifyTokenFailure());
        }
      } else {
        console.log("No decoded token");
        onError();
        yield put(authActions.logoutStart());
        yield put(authActions.verifyTokenFailure());
      }
    } else {
      console.log("No token returned");
      onError();
      yield put(authActions.logoutStart());
      yield put(authActions.verifyTokenFailure());
    }
  } catch (error) {
    console.log("AsyncStorage.getItem error:", error);

    yield put(authActions.verifyTokenFailure());
  }
};

export function* authSaga() {
  yield all([
    // Verify token at app startup
    call(onVerifyToken),
    takeEvery(authActions.loginStart.type, onLogin),
    takeEvery(authActions.signupStart.type, onRegister),
    takeEvery(authActions.loginFailure.type, onLogout),
    takeEvery(authActions.logoutStart.type, onLogout),
    // Validate token at app state change
    takeEvery(authActions.validateTokenStart.type, onValidateToken),
  ]);
}
