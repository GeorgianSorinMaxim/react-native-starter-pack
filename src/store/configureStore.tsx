import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const persistConfig = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const onRehydrate = () => {};

const getEnhancers = (sagaMiddleware: Middleware<any, any, any>) => {
  const allEnhancers = [sagaMiddleware];

  const enhancers = applyMiddleware(...allEnhancers);

  // React Native Debugger + redux-devtools-extension setup
  if (__DEV__) {
    const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : composeWithDevTools;

    return devToolsCompose({
      realtime: true,
      port: 8010,
    })(enhancers);
  }

  return enhancers;
};

export const storeWrapper = { store: null };

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(persistedReducer, getEnhancers(sagaMiddleware));
  const persistor = persistStore(store, null, () => onRehydrate(store));

  sagaMiddleware.run(rootSaga);

  storeWrapper.store = store;

  return { store, persistor };
};
