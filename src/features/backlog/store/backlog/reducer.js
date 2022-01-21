import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { backlogAdapter } from "./entityAdapter";
import { createTask } from "./createTask";
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
