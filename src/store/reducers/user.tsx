import { Reducer } from "redux";

import { ActionTypes, LoginActions } from "../actions/login";
import { UserState } from "../types/state";

export const DEFAULT_STATE = {
  id: "",
  email: "",
  firstName: undefined,
  lastName: undefined,
};

export const user: Reducer<UserState, LoginActions> = (state = DEFAULT_STATE, action) => {
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
