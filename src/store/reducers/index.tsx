import { combineReducers } from "redux";

// Reducers
import { data } from "./data";
import { login } from "./login";
import { signup } from "./signup";
import { user } from "./user";

export const rootReducer = combineReducers({
  data,
  login,
  signup,
  user,
});
