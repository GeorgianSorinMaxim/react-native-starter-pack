import {
  actionCreator,
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

import { University } from "../reducers/data";

export const dataActions = {
  fetchDataStart: actionCreator("DATA_FETCHED_START"),
  fetchDataSuccess: actionCreatorWithPayload(
    "DATA_FETCHED_SUCCESS",
    payloadType<University[]>(),
  ),
  fetchDataFailure: actionCreatorWithPayload(
    "DATA_FETCHED_FAILURE",
    payloadType<University[]>(),
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
