import { RootState } from "../reducers/root-reducer-factory";

export const getUser = (state: RootState) =>
  state.auth && state.auth.user ? state.auth.user : null;

export const getLoginStatus = (state: RootState) =>
  state.auth && state.auth && state.auth.isLoginInProgress
    ? state.auth.isLoginInProgress
    : false;

export const getLoginError = (state: RootState) =>
  state.auth && state.auth && state.auth.loginError
    ? state.auth.loginError
    : null;

export const getRegistrationStatus = (state: RootState) =>
  state.auth && state.auth && state.auth.isRegistrationInProgress
    ? state.auth.isRegistrationInProgress
    : false;

export const getRegistrationError = (state: RootState) =>
  state.auth && state.auth && state.auth.registeringError
    ? state.auth.registeringError
    : null;
