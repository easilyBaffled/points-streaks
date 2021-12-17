import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../resolveDaySelector";
import { reset } from "../actions/reset";
import { resolveDay } from "../actions";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        date: getToday()
    },
    reducers: {
        setDate: (state, { payload }) => {
            state.date = getToday(payload);
        }
    },
    extraReducers: {
        [reset]: () => ({ date: getToday() }),
        [resolveDay]: (state, { payload }) => {
            state.date = payload?.app?.date ?? state.date;
        }
    }
});

export default appSlice.reducer;
export const actions = appSlice.actions;
export const selectors = {};
