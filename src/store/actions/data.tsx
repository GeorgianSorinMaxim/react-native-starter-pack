import { FailureAction, PayloadAction } from "../types/core";

export const ActionTypes = {
  DATA_FETCHED_START: "DATA_FETCHED_START",
  DATA_FETCHED_SUCCESS: "DATA_FETCHED_SUCCESS",
  DATA_FETCHED_FAILURE: "DATA_FETCHED_FAILURE",
};

export const actions = {
  fetchData: () => ({
    type: ActionTypes.DATA_FETCHED_START,
  }),
};

export type FetchDataStart = PayloadAction<typeof ActionTypes.DATA_FETCHED_START, any>;
export type FetchDataSuccess = PayloadAction<typeof ActionTypes.DATA_FETCHED_SUCCESS, any>;
export type FetchAdvertsFailure = FailureAction<typeof ActionTypes.DATA_FETCHED_FAILURE>;

export type Actions = FetchDataStart | FetchDataSuccess | FetchAdvertsFailure;
