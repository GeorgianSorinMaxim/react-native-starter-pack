import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const persistConfig = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  blacklist: ["login", "signup"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const onRehydrate = () => {};

const getEnhancers = (sagaMiddleware) => {
  const enhancers = [sagaMiddleware];

  /* global __DEV__ */
  if (__DEV__) {
    const { logger } = require("redux-logger");
    enhancers.push(logger);
  }

  return applyMiddleware(...enhancers);
};

export const storeWrapper = { store: null };

// @ts-ignore
export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(persistedReducer, getEnhancers(sagaMiddleware));
  // @ts-ignore
  const persistor = persistStore(store, null, () => onRehydrate(store));

  sagaMiddleware.run(rootSaga);

  // @ts-ignore
  storeWrapper.store = store;

  return { store, persistor };
};
