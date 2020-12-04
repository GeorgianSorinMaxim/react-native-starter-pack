import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

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
  const allEnhancers = [sagaMiddleware];

  const enhancers = applyMiddleware(...allEnhancers);

  // React Native Debugger + redux-devtools-extension setup
  // @ts-ignore
  if (__DEV__) {
    // @ts-ignore
    const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : composeWithDevTools;

    return devToolsCompose({
      realtime: true,
      port: 8010,
    })(enhancers);
  }

  return enhancers;
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
