import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "./createTask";
import { dynamicChange, staticChange, tasksAdapter } from "./tasksAdapter";
import { reset } from "@/state/actions/reset";
import { resolveDay } from "@/state/actions";

export { selectors } from "./selectors";
export { a, b, testState } from "./testItems";
export const status = {
    active: "active",
    done:   "done"
};

function doesPayloadHaveId( state, action ) {
    const maybeId = action?.payload?.id ?? action.payload;
    return typeof maybeId === "string" && maybeId in state.entities
        ? maybeId
        : null;
}

const updateEntityHistory = dynamicChange( ( s, action ) => {
    if ( !s.history ) s.history = [];

    s.history.push({
        action,
        date: Date.now()
    });
});

const entitiesWithHistory = ( reducer ) => ( state, action ) => {
    const newState = reducer( state, action );
    const payloadDoesHaveId = doesPayloadHaveId( newState, action );
    return payloadDoesHaveId ? updateEntityHistory( newState, action ) : newState;
};

function includeHistory( reducers ) {
    return Object.fromEntries(
        Object.entries( reducers ).map( ([ name, reducer ]) => {
            const reducerWithInternalHistory = entitiesWithHistory( reducer );

            return [ name, reducerWithInternalHistory ];
        })
    );
}

const tasksSlice = createSlice({
    extraReducers: includeHistory({
        [ reset ]:      () => tasksAdapter.getInitialState({ history: {} }),
        [ resolveDay ]: ( state, action ) => {
            const { payload } = action;
            if ( payload.tasks ) {
                Object.values( state.entities ).forEach( ( task ) => {
                    if ( task.status === status.done ) {
                        state.history[ task.id ] = true;
                        task.value = 0;
                        // the resolveDay payload doesn't include any `id`, but we still need to mark it for each task
                        task.history.push({
                            action,
                            date: Date.now()
                        });
                    }
                });
            }
        }
    }),
    initialState: tasksAdapter.getInitialState({ history: {} }),
    name:         "tasks",
    reducers:     includeHistory({
        createTask: ( state, { payload }) =>
            tasksAdapter.addOne( state, createTask( payload ) ),
        createTasks: ( state, { payload: tasks }) =>
            tasksAdapter.addMany(
                state,
                tasks.map( ( t ) => createTask( t ) )
            ),
        deleteTask: ( state, { payload: id }) =>
            tasksAdapter.removeOne( state, id ),
        markTaskActive: staticChange({ status: status.active }),
        markTaskDone:   staticChange({ status: status.done }),
        restoreTask:    ( state, { payload: id }) => {
            state.history[ id ] = false;
            tasksAdapter.updateOne( state, {
                changes: { status: status.active },
                id
            });
            return state;
        },
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
        toggleTaskStatus: dynamicChange( ( t ) => ({
            status: t.status === status.active ? status.done : status.active
        }) )
    })
});

export const initialState = tasksSlice.getInitialState();
export const reducer = tasksSlice.reducer;
export const actions = tasksSlice.actions;
