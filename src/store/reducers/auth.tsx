import { Reducer } from "redux";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { authActions, AuthActionTypes } from "../actions/auth";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type AuthState = {
  isAuthenticating: boolean;
  error?: string | null;
  tokenValidation?: any;
  tokenValidationError?: string | null;
  isRegistering: boolean;
  registeringError?: string | null;
  registrationInfo?: any;
  user: User | FirebaseAuthTypes.User | null;
};

export const DEFAULT_STATE: AuthState = {
  isAuthenticating: false,
  error: null,
  user: null,
  tokenValidation: null,
  tokenValidationError: null,
  isRegistering: false,
  registeringError: undefined,
  registrationInfo: undefined,
};

export const auth: Reducer<AuthState, AuthActionTypes> = (
  state = DEFAULT_STATE,
  action,
) => {
  switch (action.type) {
    case authActions.loginStart.type:
      return {
        ...state,
        isAuthenticating: true,
        error: null,
        user: null,
      };
    case authActions.loginSuccess.type:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        user: action.payload,
      };
    case authActions.loginFailure.type:
      return {
        ...state,
        isAuthenticating: false,
        user: null,
        error: action.payload,
      };
    case authActions.signupStart.type:
      return {
        ...state,
        isRegistering: true,
        registeringError: null,
        registrationInfo: null,
      };
    case authActions.signupSuccess.type:
      return {
        ...state,
        isRegistering: false,
        registeringError: null,
        registrationInfo: action.payload,
      };
    case authActions.signupFailure.type:
      return {
        ...state,
        isRegistering: false,
        registeringError: action.payload,
        registrationInfo: null,
      };
    case authActions.logoutStart.type:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        user: null,
      };
    case authActions.logoutSuccess.type:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        user: null,
      };
    case authActions.logoutFailure.type:
      return {
        ...state,
        isAuthenticating: false,
        user: null,
        error: null,
      };
    case authActions.verifyTokenStart.type:
      return {
        ...state,
        isAuthenticating: true,
        error: null,
        user: null,
      };
    case authActions.verifyTokenSuccess.type:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
        user: action.payload,
      };
    case authActions.verifyTokenFailure.type:
      return {
        ...state,
        isAuthenticating: false,
        user: null,
        error: action.payload,
      };
    case authActions.validateTokenSuccess.type:
      return {
        ...state,
        isAuthenticating: false,
        tokenValidation: action.payload,
      };
    case authActions.validateTokenFailure.type:
      return {
        ...state,
        isAuthenticating: false,
        tokenValidationError: action.payload,
      };
  }
  return state;
};
