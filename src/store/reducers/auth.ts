import { Reducer } from "redux";

import { authActions, AuthActionTypes } from "../actions/auth";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type AuthState = {
  isLoginInProgress: boolean;
  loginError?: boolean;
  isRegistrationInProgress: boolean;
  registeringError?: boolean;
  user: User | null;
};

export const DEFAULT_STATE: AuthState = {
  isLoginInProgress: false,
  loginError: false,
  user: null,
  isRegistrationInProgress: false,
  registeringError: undefined,
};

export const auth: Reducer<AuthState, AuthActionTypes> = (
  state = DEFAULT_STATE,
  action,
) => {
  switch (action.type) {
    case authActions.loginStart.type:
      return {
        ...state,
        isLoginInProgress: true,
        loginError: false,
        user: null,
      };
    case authActions.loginSuccess.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: false,
        user: null,
      };
    case authActions.loginFailure.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: true,
        user: null,
      };
    case authActions.signupStart.type:
      return {
        ...state,
        isRegistrationInProgress: true,
        registeringError: false,
        user: null,
      };
    case authActions.signupSuccess.type:
      return {
        ...state,
        isRegistrationInProgress: false,
        registeringError: false,
        user: action.payload,
      };
    case authActions.signupFailure.type:
      return {
        ...state,
        isRegistrationInProgress: false,
        registeringError: true,
        user: null,
      };
    case authActions.logoutStart.type:
      return {
        ...state,
        isLoginInProgress: true,
        user: null,
      };
    case authActions.logoutSuccess.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: false,
        user: null,
      };
    case authActions.logoutFailure.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: true,
        user: null,
      };
    case authActions.validateTokenStart.type:
      return {
        ...state,
        isLoginInProgress: true,
        loginError: false,
      };
    case authActions.validateTokenSuccess.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: false,
      };
    case authActions.validateTokenFailure.type:
      return {
        ...state,
        isLoginInProgress: false,
        loginError: true,
      };
    case authActions.fetchUserDetailsStart.type:
      return {
        ...state,
        loginError: false,
        user: null,
      };
    case authActions.fetchUserDetailsSuccess.type:
      return {
        ...state,
        loginError: false,
        user: action.payload,
      };
    case authActions.validateTokenFailure.type:
      return {
        ...state,
        loginError: true,
        user: null,
      };
  }
  return state;
};
