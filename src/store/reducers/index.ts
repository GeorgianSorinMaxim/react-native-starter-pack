import { combineReducers } from "redux";

// Reducers
import { app } from "./app";
import { data } from "./data";
import { auth } from "./auth";

export const rootReducer = combineReducers({
  app,
  data,
  auth,
});
