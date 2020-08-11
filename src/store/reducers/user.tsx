import { Reducer } from "redux";

import { ActionTypes, LoginActions } from "../actions/login";
import State from "../types/state";

export const DEFAULT_STATE = {};

export const user: Reducer<State, LoginActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...action.payload,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {};
  }
  return state;
};
