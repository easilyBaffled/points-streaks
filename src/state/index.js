import { createSlice, createAction, configureStore } from "@reduxjs/toolkit";
import tasks, {
  actions as taskActions,
  selectors as taskSelectors,
} from "./tasks";
import bank, {
  actions as bankActions,
  selectors as bankSelectors,
} from "./bank";

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action, store.getState());
  action.state = store.getState();
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

export const appSlice = createSlice({
  name: "app",
  reducers: {
    resolveDay() {},
    resetApp() {},
  },
});

export const actions = appSlice.actions;

const reducer = {
  app: appSlice.reducer,
  tasks,
  bank,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
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
