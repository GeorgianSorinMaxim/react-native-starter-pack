import { RootState } from "../reducers/root-reducer-factory";

export const getUser = (state: RootState) =>
  state.auth && state.auth.user ? state.auth.user : null;

export const getLoginStatus = (state: RootState) =>
  state.auth && state.auth && state.auth.isAuthenticating
    ? state.auth.isAuthenticating
    : false;

export const getLoginError = (state: RootState) =>
  state.auth && state.auth && state.auth.error ? state.auth.error : null;

export const getRegistrationStatus = (state: RootState) =>
  state.auth && state.auth && state.auth.isRegistering
    ? state.auth.isRegistering
    : false;

export const getRegistrationError = (state: RootState) =>
  state.auth && state.auth && state.auth.registeringError
    ? state.auth.registeringError
    : null;
