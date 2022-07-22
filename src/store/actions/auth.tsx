import { DateTime } from "luxon";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

import { UserPayload } from "../../api/auth/firebase-auth";
import { NewUserData } from "../../api/auth/firebase-auth";

export const ActionTypes = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  SIGNUP_START: "SIGNUP_START",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  VERIFY_TOKEN_START: "VERIFY_TOKEN_START",
  VERIFY_TOKEN_SUCCESS: "VERIFY_TOKEN_SUCCESS",
  VERIFY_TOKEN_FAILURE: "VERIFY_TOKEN_FAILURE",
  VALIDATE_TOKEN_START: "VALIDATE_TOKEN_START",
  VALIDATE_TOKEN_SUCCESS: "VALIDATE_TOKEN_SUCCESS",
  VALIDATE_TOKEN_FAILURE: "VALIDATE_TOKEN_FAILURE",
};

export const authActions = {
  loginStart: actionCreatorWithPayload(
    ActionTypes.LOGIN_START,
    payloadType<{ email: string; password: string }>(),
  ),
  loginSuccess: actionCreatorWithPayload(
    ActionTypes.LOGIN_SUCCESS,
    payloadType<{ user: UserPayload | FirebaseAuthTypes.User }>(),
  ),
  loginFailure: actionCreator(ActionTypes.LOGIN_FAILURE),
  signupStart: actionCreatorWithPayload(
    ActionTypes.SIGNUP_START,
    payloadType<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>(),
  ),
  signupSuccess: actionCreatorWithPayload(
    ActionTypes.SIGNUP_SUCCESS,
    payloadType<NewUserData>(),
  ),
  signupFailure: actionCreator(ActionTypes.SIGNUP_FAILURE),
  logoutStart: actionCreator(ActionTypes.LOGOUT_START),
  logoutSuccess: actionCreator(ActionTypes.LOGOUT_SUCCESS),
  logoutFailure: actionCreator(ActionTypes.LOGOUT_FAILURE),
  validateTokenStart: actionCreator(ActionTypes.VALIDATE_TOKEN_START),
  validateTokenSuccess: actionCreatorWithPayload(
    ActionTypes.VALIDATE_TOKEN_SUCCESS,
    payloadType<{ token: string; expDate: DateTime }>(),
  ),
  validateTokenFailure: actionCreator(ActionTypes.VALIDATE_TOKEN_FAILURE),
  verifyTokenStart: actionCreator(ActionTypes.VERIFY_TOKEN_START),
  verifyTokenSuccess: actionCreatorWithPayload(
    ActionTypes.VERIFY_TOKEN_SUCCESS,
    payloadType<{ token: string; expDate: DateTime }>(),
  ),
  verifyTokenFailure: actionCreator(ActionTypes.VERIFY_TOKEN_FAILURE),
};

export type LoginStart = ReturnType<typeof authActions.loginStart>;
export type LoginSuccess = ReturnType<typeof authActions.loginSuccess>;
export type LoginFailure = ReturnType<typeof authActions.loginFailure>;

export type LogoutStart = ReturnType<typeof authActions.logoutStart>;
export type LogoutSuccess = ReturnType<typeof authActions.logoutSuccess>;
export type LogoutFailure = ReturnType<typeof authActions.logoutFailure>;

export type VerifyTokenStart = ReturnType<
  typeof authActions.validateTokenStart
>;
export type VerifyTokenSuccess = ReturnType<
  typeof authActions.validateTokenSuccess
>;
export type VerifyTokenFailure = ReturnType<
  typeof authActions.validateTokenFailure
>;

export type ValidateTokenStart = ReturnType<
  typeof authActions.validateTokenStart
>;
export type ValidateTokenSuccess = ReturnType<
  typeof authActions.validateTokenSuccess
>;
export type ValidateTokenFailure = ReturnType<
  typeof authActions.validateTokenFailure
>;

export type SignupStart = ReturnType<typeof authActions.signupStart>;
export type SignupSuccess = ReturnType<typeof authActions.signupSuccess>;
export type SignupFailure = ReturnType<typeof authActions.signupFailure>;

export type AuthActionTypes =
  | LoginStart
  | LoginSuccess
  | LoginFailure
  | LogoutStart
  | LogoutSuccess
  | LogoutFailure
  | VerifyTokenStart
  | VerifyTokenSuccess
  | VerifyTokenFailure
  | ValidateTokenStart
  | ValidateTokenSuccess
  | ValidateTokenFailure
  | SignupStart
  | SignupSuccess
  | SignupFailure;
