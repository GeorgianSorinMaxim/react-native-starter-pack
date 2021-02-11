import { combineReducers } from "redux";

// Reducers
import { app } from "./app";
import { data } from "./data";
import { login } from "./login";
import { signup } from "./signup";
import { user } from "./user";

export const rootReducer = combineReducers({
  app,
  data,
  login,
  signup,
  user,
});
