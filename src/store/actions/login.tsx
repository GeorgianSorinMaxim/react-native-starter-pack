import { Action } from "redux";
import { FailureAction, PayloadAction } from "../types/core";

export const ActionTypes = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
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
};

// TODO: Replace any type with proper type
export type LoginStart = PayloadAction<typeof ActionTypes.LOGIN_START, any>;
// TODO: Replace any type with proper type
export type LoginSuccess = PayloadAction<typeof ActionTypes.LOGIN_SUCCESS, any>;
export type LoginFailure = FailureAction<typeof ActionTypes.LOGIN_FAILURE>;

export type LogoutStart = Action<typeof ActionTypes.LOGOUT_START>;
export type LogoutSuccess = Action<typeof ActionTypes.LOGOUT_SUCCESS>;
export type LogoutFailure = Action<typeof ActionTypes.LOGOUT_FAILURE>;

export type LoginActions = LoginStart | LoginSuccess | LoginFailure | LogoutStart | LogoutSuccess | LogoutFailure;
