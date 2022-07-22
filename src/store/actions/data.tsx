import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

export const ActionTypes = {
  DATA_FETCHED_START: "DATA_FETCHED_START",
  DATA_FETCHED_SUCCESS: "DATA_FETCHED_SUCCESS",
  DATA_FETCHED_FAILURE: "DATA_FETCHED_FAILURE",
};

export const dataActions = {
  fetchDataStart: actionCreator(ActionTypes.DATA_FETCHED_START),
  fetchDataSuccess: actionCreatorWithPayload(
    ActionTypes.DATA_FETCHED_SUCCESS,
    payloadType<any>(),
  ),
  fetchDataFailure: actionCreatorWithPayload(
    ActionTypes.DATA_FETCHED_FAILURE,
    payloadType<any>(),
  ),
};

export type FetchDataStart = ReturnType<typeof dataActions.fetchDataStart>;
export type FetchDataSuccess = ReturnType<typeof dataActions.fetchDataSuccess>;
export type FetchAdvertsFailure = ReturnType<
  typeof dataActions.fetchDataFailure
>;

export type DataActionTypes =
  | FetchDataStart
  | FetchDataSuccess
  | FetchAdvertsFailure;
