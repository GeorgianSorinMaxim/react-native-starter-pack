import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

import { FirebaseUser, UserData } from "../../types/api-types";

export const authActions = {
  loginStart: actionCreatorWithPayload(
    "LOGIN_START",
    payloadType<{ email: string; password: string }>(),
  ),
  loginSuccess: actionCreatorWithPayload(
    "LOGIN_SUCCESS",
    payloadType<{ user: FirebaseUser }>(),
  ),
  loginFailure: actionCreator("LOGIN_FAILURE"),
  signupStart: actionCreatorWithPayload(
    "SIGNUP_START",
    payloadType<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>(),
  ),
  signupSuccess: actionCreatorWithPayload(
    "SIGNUP_SUCCESS",
    payloadType<UserData>(),
  ),
  signupFailure: actionCreator("SIGNUP_FAILURE"),
  logoutStart: actionCreator("LOGOUT_START"),
  logoutSuccess: actionCreator("LOGOUT_SUCCESS"),
  logoutFailure: actionCreator("LOGOUT_FAILURE"),
  validateTokenStart: actionCreator("VALIDATE_TOKEN_START"),
  validateTokenSuccess: actionCreator("VALIDATE_TOKEN_SUCCESS"),
  validateTokenFailure: actionCreator("VALIDATE_TOKEN_FAILURE"),
  fetchUserDetailsStart: actionCreatorWithPayload(
    "FETCH_USER_DETAILS_START",
    payloadType<{ userId: string }>(),
  ),
  fetchUserDetailsSuccess: actionCreatorWithPayload(
    "FETCH_USER_DETAILS_SUCCESS",
    payloadType<UserData>(),
  ),
  fetchUserDetailsFailure: actionCreator("FETCH_USER_DETAILS_FAILURE"),
  deleteAccountStart: actionCreator("DELETE_ACCOUNT_START"),
  deleteAccountSuccess: actionCreator("DELETE_ACCOUNT_SUCCESS"),
  deleteAccountFailure: actionCreator("DELETE_ACCOUNT_FAILURE"),
};

export type LoginStart = ReturnType<typeof authActions.loginStart>;
export type LoginSuccess = ReturnType<typeof authActions.loginSuccess>;
export type LoginFailure = ReturnType<typeof authActions.loginFailure>;

export type LogoutStart = ReturnType<typeof authActions.logoutStart>;
export type LogoutSuccess = ReturnType<typeof authActions.logoutSuccess>;
export type LogoutFailure = ReturnType<typeof authActions.logoutFailure>;

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

export type FetchUserDetailsStart = ReturnType<
  typeof authActions.fetchUserDetailsStart
>;
export type FetchUserDetailsSuccess = ReturnType<
  typeof authActions.fetchUserDetailsSuccess
>;
export type FetchUserDetailsFailure = ReturnType<
  typeof authActions.fetchUserDetailsFailure
>;

export type DeleteAccountStart = ReturnType<
  typeof authActions.deleteAccountStart
>;
export type DeleteAccountSuccess = ReturnType<
  typeof authActions.deleteAccountSuccess
>;
export type DeleteAccountFailure = ReturnType<
  typeof authActions.deleteAccountFailure
>;

export type AuthActionTypes =
  | LoginStart
  | LoginSuccess
  | LoginFailure
  | LogoutStart
  | LogoutSuccess
  | LogoutFailure
  | ValidateTokenStart
  | ValidateTokenSuccess
  | ValidateTokenFailure
  | SignupStart
  | SignupSuccess
  | SignupFailure
  | FetchUserDetailsStart
  | FetchUserDetailsSuccess
  | FetchUserDetailsFailure
  | DeleteAccountStart
  | DeleteAccountSuccess
  | DeleteAccountFailure;
