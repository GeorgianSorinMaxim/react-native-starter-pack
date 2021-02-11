import { Reducer } from "redux";

import { ActionTypes, AppActions } from "../actions/app";
import { AppState } from "../types/state";

export const DEFAULT_STATE = {
  state: {
    prevState: undefined,
    newState: "active",
  },
};

export const app: Reducer<AppState, AppActions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_APP_STATE:
      return {
        ...state,
        state: {
          prevState: action.payload.prevState,
          newState: action.payload.newState,
        },
      };
  }
  return state;
};
