import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {
    resolveDay() {},
  },
});

export default appSlice.reducer;
export const actions = appSlice.actions;
