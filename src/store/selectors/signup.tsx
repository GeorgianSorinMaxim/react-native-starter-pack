import { RootState } from "../types/state";

export const getRegistrationStatus = (state: RootState) =>
  state.signup &&
  state.signup && state.signup.isRegistering ? state.signup.isRegistering : false

export const getRegistrationError = (state: RootState) =>
  state.signup &&
  state.signup && state.signup.registeringError ? state.signup.registeringError : null
