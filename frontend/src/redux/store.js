import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import counterReducer from './slices/counterSlice'

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(
  persistConfig,
  userReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    counter: counterReducer,
  },
});

export const persistor = persistStore(store);