import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "./createTask";
import { initialState } from "./initialState";
import { dynamicChange, staticChange, tasksAdapter } from "./tasksAdapter";
import { status as _status, streakMax as _streakMax } from "./constants";
import { reset } from "@/state/actions/reset";
import { resolveDay } from "@/state/actions";

export { selectors } from "./selectors";
export const status = _status;
export const streakMax = _streakMax;
export const a = "a";
export const b = "b";

export const testState = {
    entities: {
        [ a ]: createTask( a, { id: a }),
        [ b ]: createTask( b, { id: b })
    },
    ids: [ a, b ]
};

function bumpStreakChange( t ) {
    if ( t.currentStreakIndex === streakMax ) {
        return {
            currentStreakIndex: 1,
            streakIterations:   t.streakIterations + 1
        };
    }
    return {
        currentStreakIndex: t.currentStreakIndex + 1
    };
}

const tasksSlice = createSlice({
    extraReducers: {
        [ reset ]: ( state, { payload }) =>
            tasksAdapter.getInitialState( payload?.streaks ?? initialState ),
        [ resolveDay ]: ( state, { payload }) => {
            if ( payload.tasks ) {
                Object.values( state.entities ).forEach( ( task ) => {
                    if ( task.status === status.active ) {
                        task.streakIterations = 1;
                        task.currentStreakIndex = 1;
                    } else {
                        task.status = status.active;
                        dynamicChange( bumpStreakChange )( state, {
                            payload: task.id
                        });
                    }
                });
            }
        }
    },
    initialState: tasksAdapter.getInitialState( initialState ),
    name:         "streaks",
    reducers:     {
        bumpStreak: dynamicChange( bumpStreakChange ),

        bumpStreakIndex: dynamicChange( ( t ) => ({
            currentStreakIndex: t.currentStreakIndex + 1
        }) ),

        bumpStreakIterations: dynamicChange( ( t ) => ({
            streakIterations: t.streakIterations + 1
        }) ),

        markTaskActive: staticChange({ status: status.active }),

        markTaskDone: staticChange({ status: status.done }),

        resetStreak: staticChange({
            currentStreakIndex: 1,
            status:             status.active,
            streakIterations:   1
        }),
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
        toggleTaskStatus: dynamicChange( ( t ) => ({
            status: t.status === status.active ? status.done : status.active
        }) )
    }
});

export const reducer = tasksSlice.reducer;
export const actions = tasksSlice.actions;
