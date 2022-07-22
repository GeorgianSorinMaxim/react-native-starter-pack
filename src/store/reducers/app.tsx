import { Reducer } from "redux";

import { appActions, AppActionTypes } from "../actions/app";

export type AppState = {
  state: {
    prevState?: string;
    newState?: string;
  };
};

export const DEFAULT_STATE: AppState = {
  state: {
    prevState: undefined,
    newState: "active",
  },
};

export const app: Reducer<AppState, AppActionTypes> = (
  state = DEFAULT_STATE,
  action,
) => {
  switch (action.type) {
    case appActions.appStateUpdated.type:
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
