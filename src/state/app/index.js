import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../resolveDaySelector";
import { reset } from "../actions/reset";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        date: getToday()
    },
    reducers: {
        setDate: (state, { payload }) => {
            state.date = getToday(payload);
        },
        resolveDay(state, { payload }) {
            state.date = payload?.app?.date ?? state.date;
        }
    },
    extraReducers: {
        [reset]: () => ({ date: getToday() })
    }
});

export default appSlice.reducer;
export const actions = appSlice.actions;
export const selectors = {};
