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
} from "../features/bank/store";
import app, { actions as appActions, selectors as appSelectors } from "./app";
import { reset } from "./actions/reset";
import { createFireBaseRealTimePersistConfig } from "@/libs/persistFirebase";
import {
    reducer as rewards,
    actions as rewardsActions,
    selectors as rewardsSelectors
} from "@/features/rewards";

const fbStorage = createFireBaseRealTimePersistConfig();

const testStorage = { storage };
/**
 * Redux Persist
 */
const persistConfig = {
    key:     "root",
    version: 1,
    ...( import.meta.env.MODE === "test" ? testStorage : fbStorage )
};

export const actions = {
    reset,
    ...taskActions,
    ...rewardsActions,
    ...appActions,
    ...bankActions,
    ...streakActions
};

export const selectors = {
    app:     appSelectors,
    bank:    bankSelectors,
    rewards: rewardsSelectors,
    streaks: streakSelectors,
    tasks:   taskSelectors
};

export const reducer = combineReducers({
    app,
    bank,
    rewards,
    streaks,
    tasks
});

const persistedReducer = persistReducer( persistConfig, reducer );

const store = configureStore({
    devTools:   true,
    middleware: ( getDefaultMiddleware ) =>
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
    reducer: persistedReducer
    // preloadedState,
    // enhancers: [reduxBatch],
});

export let persistor = persistStore( store );

export default store;

export const initialState = store.getState();
