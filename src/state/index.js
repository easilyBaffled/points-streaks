import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
    reducer as tasks,
    actions as taskActions,
    selectors as taskSelectors
} from "../features/task/store";
import bank, {
    actions as bankActions,
    selectors as bankSelectors
} from "./bank";
import app, { actions as appActions, selectors as appSelectors } from "./app";
import { reset } from "./actions/reset";
import { createFireBaseRealTimePersistConfig } from "../libs";
import firebaseConfig from '../config/firebase'
/**
 * Redux Persist
 */
const persistConfig = {
    key: "root",
    version: 1,
    storage: createFireBaseRealTimePersistConfig(firebaseConfig)
};

export const actions = {
    reset,
    ...appActions,
    ...bankActions,
    ...taskActions
};

export const selectors = {
    tasks: taskSelectors,
    app: appSelectors,
    bank: bankSelectors
};

export const reducer = combineReducers({
    app,
    tasks,
    bank
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
    devTools: true //process.env.NODE_ENV !== "production",
    // preloadedState,
    // enhancers: [reduxBatch],
});

export let persistor = persistStore(store);

export default store;

export const initialState = store.getState();

//
// store.dispatch(counter.actions.increment());
// // -> { counter: 1, user: {name : '', age: 21} }
// store.dispatch(counter.actions.increment());
// // -> { counter: 2, user: {name: '', age: 22} }
// store.dispatch(counter.actions.multiply(3));
// // -> { counter: 6, user: {name: '', age: 22} }
// store.dispatch(counter.actions.multiply());
// // -> { counter: 12, user: {name: '', age: 22} }
// console.log(`${counter.actions.decrement}`);
// // -> "counter/decrement"
// store.dispatch(user.actions.setUserName("eric"));
// // -> { counter: 12, user: { name: 'eric', age: 22} }
