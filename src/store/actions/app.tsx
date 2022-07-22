import {
  actionCreatorWithPayload,
  payloadType,
} from "./action-creator-factories";

export const ActionTypes = {
  GET_APP_STATE: "GET_APP_STATE",
};

export const appActions = {
  appStateUpdated: actionCreatorWithPayload(
    ActionTypes.GET_APP_STATE,
    payloadType<{ prevState: string; newState: string }>(),
  ),
};

export type GetAppState = ReturnType<typeof appActions.appStateUpdated>;

export type AppActionTypes = GetAppState;
