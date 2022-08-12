import { Alert } from "react-native";
import { put, all, call, takeEvery } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

import {
  LoginStart,
  SignupStart,
  FetchUserDetailsStart,
  authActions,
} from "../actions/auth";
import { dataActions } from "../actions/data";

import {
  login,
  logout,
  register,
  getUser,
  getToken,
  deleteUser,
} from "../../api/auth/firebase-auth";

import { navigate } from "../../navigation/RootNavigation";
import { ScreenNames } from "../../navigation/ScreenNames";

import { logError } from "../../api/logger";

const onError = () => {
  try {
    AsyncStorage.removeItem("token");
  } catch (error) {
    logError("Auth - onError");
  }

  Alert.alert(
    "Session expired",
    "Please login again",
    [{ text: "OK", onPress: () => {} }],
    { cancelable: false },
  );
};

const onLoginFailed = () => {
  Alert.alert(
    "Login failed",
    "Please try to login again",
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
        logError("Auth - onLogin - AsyncStorage.set error");
      }
    }

    if (userPayload && userPayload.user.uid) {
      yield put(authActions.loginSuccess({ user: userPayload }));
      yield put(
        authActions.fetchUserDetailsStart({ userId: userPayload.user.uid }),
      );
      yield put(dataActions.fetchArticlesStart());

      navigate(ScreenNames.TABS, { screen: ScreenNames.HOME });
    } else {
      yield put(authActions.loginFailure());
      onLoginFailed();
    }
  } catch (error) {
    logError("Auth - onLogin - error", error);
    yield put(authActions.loginFailure());
    onLoginFailed();
  }
};

export const onRegister = function* (action: SignupStart) {
  const {
    payload: { firstName, lastName, email, password },
  } = action;

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
      navigate(ScreenNames.HOME);
    } else {
      yield put(authActions.signupFailure());
    }
  } catch (error) {
    logError("Auth - onRegister - error", error);
  }
};

export const onLogout = function* () {
  try {
    const res: Awaited<ReturnType<typeof logout>> = yield call(logout);

    try {
      yield AsyncStorage.removeItem("token");
    } catch (error) {
      logError("Auth - onLogout - AsyncStorage.removeItem error");
    }

    if (res) {
      yield put(authActions.logoutSuccess());
    } else {
      yield put(authActions.logoutFailure());
    }

    // Navigate to the LOGIN screen
    yield call(navigate, ScreenNames.LOGIN);
  } catch (error) {
    logError("Auth - onLogout - error", error);
  }
};

// Fetch the token and check if it is still valid
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
          yield put(authActions.validateTokenSuccess());
        } else {
          onError();
          yield put(authActions.logoutStart());
          yield put(authActions.validateTokenFailure());
        }
      } else {
        onError();
        yield put(authActions.logoutStart());
        yield put(authActions.validateTokenFailure());
      }
    } else {
      onError();
      yield put(authActions.logoutStart());
      yield put(authActions.validateTokenFailure());
    }
  } catch (error) {
    yield put(authActions.validateTokenFailure());
  }
};

export const onFetchUser = function* (action: FetchUserDetailsStart) {
  const {
    payload: { userId },
  } = action;

  try {
    const userPayload: Awaited<ReturnType<typeof getUser>> = yield call(
      getUser,
      userId,
    );

    if (userPayload) {
      yield put(authActions.fetchUserDetailsSuccess(userPayload));
    } else {
      yield put(authActions.fetchUserDetailsFailure());
    }
  } catch (error) {
    logError("Auth - onFetchUser - error", error);
    yield put(authActions.fetchUserDetailsFailure());
  }
};

export const onDeleteUser = function* () {
  try {
    const res: Awaited<ReturnType<typeof deleteUser>> = yield call(deleteUser);

    if (res) {
      yield put(authActions.deleteAccountSuccess());
    } else {
      yield put(authActions.deleteAccountFailure());
    }
  } catch (error) {
    logError("Auth - onDeleteUser - error", error);
    yield put(authActions.deleteAccountFailure());
  }
};

export function* authSaga() {
  yield all([
    takeEvery(authActions.loginStart.type, onLogin),
    takeEvery(authActions.signupStart.type, onRegister),
    takeEvery(authActions.logoutStart.type, onLogout),
    takeEvery(authActions.validateTokenStart.type, onValidateToken),
    takeEvery(authActions.fetchUserDetailsStart.type, onFetchUser),
    takeEvery(authActions.deleteAccountStart.type, onDeleteUser),
  ]);
}
