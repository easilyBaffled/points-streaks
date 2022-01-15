import { createSelector } from "@reduxjs/toolkit";
import { tasksAdapter } from "./tasksAdapter";
import { status, streakMax } from "./constants";
import { currencies } from "@/features/bank";

export const selectors = tasksAdapter.getSelectors(
    ( state ) => state?.streaks ?? state
);
selectors.getStreak = selectors.selectById;

// /**
//  * @type {(state: unknown, id: EntityId) => number}
//  */
selectors.getStreakIndex = createSelector(
    selectors.getStreak,
    ( task ) => task.currentStreakIndex
);

selectors.getStreakIteration = createSelector(
    selectors.getStreak,
    ( task ) => task.streakIterations
);

selectors.getStreakValue = createSelector( selectors.getStreak, ( task ) =>
    task.status === status.active
        ? 0
        : task.currentStreakIndex === streakMax
            ? currencies.pizza
            : task.currentStreakIndex * task.streakIterations
);

selectors.getDaysPoints = createSelector(
    [ selectors.selectIds, ( state ) => state ],
    ( taskIds, state ) =>
        taskIds
            .map( ( id ) => selectors.getStreakValue( state, id ) )
            .reduce(
                ( acc, value ) => {
                    if ( Number.isInteger( value ) ) acc.points += value;
                    else {
                        acc[ currencies[ value ] ] =
                            ( acc?.[ currencies[ value ] ] ?? 0 ) + 1;
                    }
                    return acc;
                },
                { points: 0 }
            )
);
