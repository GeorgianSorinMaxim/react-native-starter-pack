import { PayloadAction } from "../types/core";

export const ActionTypes = {
  GET_APP_STATE: "GET_APP_STATE",
};

export const actions = {
  appStateUpdated: (prevState, newState) => ({
    type: ActionTypes.GET_APP_STATE,
    payload: { prevState, newState },
  }),
};

export type GetAppState = PayloadAction<typeof ActionTypes.GET_APP_STATE, any>;

export type AppActions = GetAppState;
