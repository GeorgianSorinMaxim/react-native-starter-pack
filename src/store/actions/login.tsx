import { FailureAction, PayloadAction } from "../types/core";

export const ActionTypes = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
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

export const actions = {
  login: (email, password) => ({
    type: ActionTypes.LOGIN_START,
    email,
    password,
  }),
  logout: () => ({
    type: ActionTypes.LOGOUT_START,
  }),
  validateToken: () => ({
    type: ActionTypes.VALIDATE_TOKEN_START,
  }),
};

export type LoginStart = PayloadAction<typeof ActionTypes.LOGIN_START, any>;
export type LoginSuccess = PayloadAction<typeof ActionTypes.LOGIN_SUCCESS, any>;
export type LoginFailure = FailureAction<typeof ActionTypes.LOGIN_FAILURE>;

export type LogoutStart = PayloadAction<typeof ActionTypes.LOGOUT_START, any>;
export type LogoutSuccess = PayloadAction<typeof ActionTypes.LOGOUT_SUCCESS, any>;
export type LogoutFailure = FailureAction<typeof ActionTypes.LOGOUT_FAILURE>;

export type VerifyTokenStart = PayloadAction<typeof ActionTypes.VERIFY_TOKEN_START, any>;
export type VerifyTokenSuccess = PayloadAction<typeof ActionTypes.VERIFY_TOKEN_SUCCESS, any>;
export type VerifyTokenFailure = FailureAction<typeof ActionTypes.VERIFY_TOKEN_FAILURE>;

export type ValidateTokenStart = PayloadAction<typeof ActionTypes.VALIDATE_TOKEN_START, any>;
export type ValidateTokenSuccess = PayloadAction<typeof ActionTypes.VALIDATE_TOKEN_SUCCESS, any>;
export type ValidateTokenFailure = FailureAction<typeof ActionTypes.VALIDATE_TOKEN_FAILURE>;

export type LoginActions =
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
  | ValidateTokenFailure;
