import { Reducer } from 'redux'

import { ActionTypes, RegistrationActions } from "../actions/signup";
import State from "../types/state";

export const DEFAULT_STATE = {
  isRegistering: false,
  registeringError: null,
  registrationInfo: null
};

export const signup: Reducer<State, RegistrationActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_START:
      return {
        isRegistering: true,
        registeringError: null,
        registrationInfo: null
      };
    case ActionTypes.REGISTRATION_SUCCESS:
      return {
        isRegistering: false,
        registeringError: null,
        registrationInfo: action.payload
      };
    case ActionTypes.REGISTRATION_FAILURE:
      return {
        isRegistering: false,
        registeringError: action.payload.message,
        registrationInfo: null
      };
  }
  return state;
};
