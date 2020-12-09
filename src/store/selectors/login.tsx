import { RootState } from "../types/state";

export const getLoginStatus = (state: RootState) =>
  state.login && state.login && state.login.isAuthenticating ? state.login.isAuthenticating : false;

export const getLoginError = (state: RootState) =>
  state.login && state.login && state.login.error ? state.login.error : null;
