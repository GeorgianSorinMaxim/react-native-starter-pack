import { Reducer } from "redux";

import { ActionTypes, Actions } from "../actions/data";
import State from "../types/state";

export const DEFAULT_STATE = {
  data: [],
};

export const data: Reducer<State, Actions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHED_SUCCESS:
    case ActionTypes.DATA_FETCHED_FAILURE:
      return { ...state, data: action.payload };
  }
  return state;
};
