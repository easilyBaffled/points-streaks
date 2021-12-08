import { configureStore } from "@reduxjs/toolkit";
import {
  reducer as tasks,
  actions as taskActions,
  selectors as taskSelectors,
} from "../features/task/store";
import bank, {
  actions as bankActions,
  selectors as bankSelectors,
} from "./bank";
import app, { actions as appActions, selectors as appSelectors } from "./app";
import { reset } from "./reset";

export const actions = {
  reset,
  ...appActions,
  ...bankActions,
  ...taskActions,
};

export const selectors = {
  tasks: taskSelectors,
  app: appSelectors,
  bank: bankSelectors,
};

export const reducer = {
  app,
  tasks,
  bank,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
  devTools: true, //process.env.NODE_ENV !== "production",
  // preloadedState,
  // enhancers: [reduxBatch],
});

export const initialState = store.getState();

export default store;

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
