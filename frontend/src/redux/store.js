import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import counterReducer from './slices/counterSlice'
import cartReducer from './slices/cartSlice'

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userReducer
);

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);


const rootReducer = combineReducers({
  user: persistedUserReducer,
  cart: persistedCartReducer,
  counter: counterReducer, 
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);