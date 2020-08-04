import { FailureAction, PayloadAction } from "../types/core";

export const ActionTypes = {
  REGISTRATION_START: "REGISTRATION_START",
  REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
  REGISTRATION_FAILURE: "REGISTRATION_FAILURE"
};

export const actions = {
  register: (firstName, lastName, email, password) => ({
    type: ActionTypes.REGISTRATION_START,
    firstName,
    lastName,
    email,
    password,
  })
};

// TODO: Replace any type with proper type
export type RegistrationStart = PayloadAction<typeof ActionTypes.REGISTRATION_START, any>
// TODO: Replace any type with proper type
export type RegistrationSuccess = PayloadAction<typeof ActionTypes.REGISTRATION_SUCCESS, any>
export type RegistrationFailure = FailureAction<typeof ActionTypes.REGISTRATION_FAILURE>

export type RegistrationActions = RegistrationStart | RegistrationSuccess | RegistrationFailure