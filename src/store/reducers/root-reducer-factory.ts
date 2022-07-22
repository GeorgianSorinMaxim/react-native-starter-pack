import { combineReducers } from "redux";

// Reducers
import { app, AppState } from "./app";
import { auth, AuthState } from "./auth";
import { data, DataState } from "./data";

export function rootReducerFactory() {
  return {
    rootReducer: combineReducers({
      app,
      auth,
      data,
    }),
  };
}

export type RootReducer = ReturnType<typeof rootReducerFactory>["rootReducer"];

export type RootState = {
  app: AppState;
  auth: AuthState;
  data: DataState;
};
