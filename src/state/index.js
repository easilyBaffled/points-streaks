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
    reducer as streaks,
    actions as streakActions,
    selectors as streakSelectors
} from "../features/streak/store";
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
import { createFireBaseRealTimePersistConfig } from "../libs/persistFirebase";
import firebaseConfig from "../config/firebase";

const fbStorage = createFireBaseRealTimePersistConfig(firebaseConfig);

const testStorage = { storage };
/**
 * Redux Persist
 */
const persistConfig = {
    key: "root",
    version: 1,
    ...(import.meta.env.MODE === "test" ? testStorage : fbStorage)
};

export const actions = {
    reset,
    ...taskActions,
    ...appActions,
    ...bankActions,
    ...streakActions
};

export const selectors = {
    tasks: taskSelectors,
    streaks: streakSelectors,
    app: appSelectors,
    bank: bankSelectors
};

export const reducer = combineReducers({
    app,
    streaks,
    bank,
    tasks
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
