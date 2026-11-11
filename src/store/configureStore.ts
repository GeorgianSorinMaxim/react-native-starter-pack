import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Action,
  applyMiddleware,
  createStore,
  Middleware,
  Reducer,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const persistConfig = {
  key: "root",
  version: 0,
  storage: AsyncStorage,
  whitelist: ["accounts"],
  blacklist: ["auth"],
};

const getMiddleware = (sagaMiddleware: Middleware) => {
  const allMiddleware = [sagaMiddleware];

  return applyMiddleware(...allMiddleware);
};

// redux-persist still types reducers against Redux 4, so we widen the type here.
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as Reducer<ReturnType<typeof rootReducer>, Action>,
);

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = getMiddleware(sagaMiddleware);

  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store, null);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
