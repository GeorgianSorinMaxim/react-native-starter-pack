import { Reducer } from "redux";

import { dataActions, DataActionTypes } from "../actions/data";

export type University = {
  name: string;
  url: string;
  imageUrl?: string;
  geo?: {
    address: {
      streetAddress: string;
      postalCode: string;
      addressLocality: string;
    };
  };
};

export type DataState = {
  universities: University[] | [];
};

export const DEFAULT_STATE: DataState = {
  universities: [],
};

export const data: Reducer<DataState, DataActionTypes> = (
  state = DEFAULT_STATE,
  action,
) => {
  switch (action.type) {
    case dataActions.fetchDataSuccess.type:
    case dataActions.fetchDataFailure.type:
      return { ...state, universities: action.payload };
  }
  return state;
};
