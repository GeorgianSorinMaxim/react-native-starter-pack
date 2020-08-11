import { RootState } from "../types/state";

export const getLoginStatus = (state: RootState) =>
  state.login && state.login && state.login.isLogging ? state.login.isLogging : false;

export const getLoginError = (state: RootState) =>
  state.login && state.login && state.login.loginError ? state.login.loginError : null;
