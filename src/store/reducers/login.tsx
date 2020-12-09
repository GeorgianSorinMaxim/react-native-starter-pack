import { Reducer } from "redux";

import { ActionTypes, LoginActions } from "../actions/login";
import { LoginState } from "../types/state";

export const DEFAULT_STATE = {
  isAuthenticating: false,
  error: null,
  loginInfo: null,
  tokenValidation: null,
  tokenValidationError: null,
};

export const login: Reducer<LoginState, LoginActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return {
        isAuthenticating: true,
        error: null,
        loginInfo: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticating: false,
        error: null,
        loginInfo: action.payload,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        isAuthenticating: false,
        loginInfo: null,
        error: action.payload,
      };
    case ActionTypes.VERIFY_TOKEN_START:
      return {
        ...state,
        isAuthenticating: true,
        error: null,
        loginInfo: null,
      };
    case ActionTypes.VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        loginInfo: action.payload,
      };
    case ActionTypes.VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        loginInfo: null,
        error: action.payload,
      };
    case ActionTypes.LOGOUT_START:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        loginInfo: null,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        loginInfo: null,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        loginInfo: null,
        error: action.payload,
      };
    case ActionTypes.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        tokenValidation: action.payload,
      };
    case ActionTypes.VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        tokenValidationError: action.payload,
      };
  }
  return state;
};
