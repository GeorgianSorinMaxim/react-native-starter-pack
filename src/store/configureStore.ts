import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const persistConfig = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  blacklist: ["auth"],
};

const getMiddleware = (sagaMiddleware: Middleware) => {
  const allMiddleware = [sagaMiddleware];

  if (__DEV__ && !process.env.JEST_WORKER_ID) {
    const createDebugger = require("redux-flipper").default;
    allMiddleware.push(createDebugger());
  }

  return applyMiddleware(...allMiddleware);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = getMiddleware(sagaMiddleware);

  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store, null);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
