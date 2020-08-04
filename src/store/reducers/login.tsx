import { Reducer } from 'redux'

import { ActionTypes, LoginActions } from "../actions/login";
import State from "../types/state";

export const DEFAULT_STATE = {
  isLogging: false,
  loginError: null,
  loginInfo: null,
};

export const login: Reducer<State, LoginActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return {
        isLogging: true,
        loginError: null,
        loginInfo: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        isLogging: false,
        loginError: null,
        loginInfo: action.payload,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        isLogging: false,
        loginInfo: null,
        loginError: action.payload,
      };
  }
  return state;
};
