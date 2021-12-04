import { configureStore } from "@reduxjs/toolkit";
import tasks, { actions as taskActions } from "./tasks";
import bank, { actions as bankActions } from "./bank";
import app, { actions as appActions } from "./app";
import { reset } from "./reset";

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action, store.getState());
  action.state = store.getState();
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

export const actions = {
  reset,
  ...appActions,
  ...bankActions,
  ...taskActions,
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
