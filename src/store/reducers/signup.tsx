import { Reducer } from "redux";

import { ActionTypes, RegistrationActions } from "../actions/signup";
import { SignupState } from "../types/state";

export const DEFAULT_STATE = {
  isRegistering: false,
  registeringError: undefined,
  registrationInfo: undefined,
};

export const signup: Reducer<SignupState, RegistrationActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_START:
      return {
        isRegistering: true,
        registeringError: null,
        registrationInfo: null,
      };
    case ActionTypes.REGISTRATION_SUCCESS:
      return {
        isRegistering: false,
        registeringError: null,
        registrationInfo: action.payload,
      };
    case ActionTypes.REGISTRATION_FAILURE:
      return {
        isRegistering: false,
        registeringError: action.payload,
        registrationInfo: null,
      };
  }
  return state;
};
