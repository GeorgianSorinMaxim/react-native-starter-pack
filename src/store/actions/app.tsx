import { FailureAction, PayloadAction } from '../types/core'

export const ActionTypes = {
  DATA_FETCHED_SUCCESS: "DATA_FETCHED_SUCCESS",
  DATA_FETCHED_FAILURE: "DATA_FETCHED_FAILURE",
};

export const actions = {};

// TODO: Replace any type with proper type (see fetchData.payload)
export type FetchDataSuccess = PayloadAction<typeof ActionTypes.DATA_FETCHED_SUCCESS, any>
export type FetchAdvertsFailure = FailureAction<typeof ActionTypes.DATA_FETCHED_FAILURE>

export type Actions = FetchDataSuccess | FetchAdvertsFailure