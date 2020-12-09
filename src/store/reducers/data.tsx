import { Reducer } from "redux";

import { ActionTypes, Actions } from "../actions/data";
import { DataState } from "../types/state";

export const DEFAULT_STATE = {
  universities: [],
};

export const data: Reducer<DataState, Actions> = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHED_SUCCESS:
    case ActionTypes.DATA_FETCHED_FAILURE:
      return { ...state, universities: action.payload };
  }
  return state;
};
