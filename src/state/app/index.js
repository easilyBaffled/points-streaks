import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../resolveDaySelector";
import { reset } from "../actions/reset";
import { resolveDay } from "../actions";

export const appSlice = createSlice({
    extraReducers: {
        [ reset ]:      () => ({ date: getToday() }),
        [ resolveDay ]: ( state, { payload }) => {
            state.date = payload?.app?.date ?? state.date;
        }
    },
    initialState: {
        date: getToday()
    },
    name:     "app",
    reducers: {
        setDate: ( state, { payload }) => {
            state.date = getToday( payload );
        }
    }
});

export default appSlice.reducer;
export const actions = appSlice.actions;
export const selectors = {};
