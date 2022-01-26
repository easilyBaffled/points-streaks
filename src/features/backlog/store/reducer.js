import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { backlogAdapter } from "./entityAdapter.js";
import { createTask } from "./createTask.js";
import { promoteTask } from "@/state/actions/promoteTask.js";

export const slice = createSlice({
    extraReducers: {
        [ promoteTask ]: ( state, { payload: { id } }) =>
            backlogAdapter.removeOne( state, id )
    },
    initialState,
    name:     "backlog",
    reducers: {
        createTask: ( state, { payload }) =>
            backlogAdapter.addOne( state, createTask( payload ) ),
        createTasks: ( state, { payload: tasks }) =>
            backlogAdapter.addMany(
                state,
                tasks.map( ( t ) => createTask( t ) )
            ),
        deleteTask: ( state, { payload: id }) =>
            backlogAdapter.removeOne( state, id )
    }
});

export const actions = slice.actions;
export const reducer = slice.reducer;
