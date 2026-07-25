// src/redux/store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

// Create Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;