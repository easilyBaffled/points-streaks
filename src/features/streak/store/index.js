import {
    createEntityAdapter,
    createSelector,
    createSlice,
    nanoid
} from "@reduxjs/toolkit";
import { reset } from "../../../state/actions/reset";
import { currencies } from "../../../state/bank";
import { listToEntity } from "../../../utils";
import { resolveDay } from "../../../state/actions";

export const status = {
    active: "active",
    done: "done"
};

/**
 *
 * @param {string} task
 * @param {TaskParts} optional
 * @return TaskStreak
 */
function createTask(task, optional = {}) {
    return {
        id: nanoid(),
        status: status.active,
        task,
        streakIterations: 1,
        currentStreakIndex: 1,
        ...optional
    };
}

export const streakMax = 6;

const tasksAdapter = createEntityAdapter();

export const a = "a";
export const b = "b";

export const testState = {
    ids: [a, b],
    entities: {
        [a]: createTask(a, { id: a }),
        [b]: createTask(b, { id: b })
    }
};

export const initialState = listToEntity(
    [
        "email",
        "meditate",
        "teeth",
        "clean 5%",
        "quirk",
        "walk",
        "dev tea",
        "luminosity",
        "🔊📚 (20)",
        "read(20)",
        "track 🥪",
        "track 🥤",
        "fiber 🧻",
        "#points"
    ].map((s) => createTask(s, { id: s.replace(/ /g, "-") }))
);
const staticChange =
    (changes) =>
    (state, { payload }) =>
        tasksAdapter.updateOne(state, { id: payload, changes });

const dynamicChange =
    (updater) =>
    (state, { payload }) =>
        tasksAdapter.updateOne(state, {
            id: payload,
            changes: updater(state.entities[payload])
        });

function bumpStreakChange(t) {
    if (t.currentStreakIndex === streakMax) {
        return {
            streakIterations: t.streakIterations + 1,
            currentStreakIndex: 1
        };
    }
    return {
        currentStreakIndex: t.currentStreakIndex + 1
    };
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksAdapter.getInitialState(initialState),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
        toggleTaskStatus: dynamicChange((t) => ({
            status: t.status === status.active ? status.done : status.active
        })),
        markTaskActive: staticChange({ status: status.active }),
        markTaskDone: staticChange({ status: status.done }),
        bumpStreakIterations: dynamicChange((t) => ({
            streakIterations: t.streakIterations + 1
        })),
        bumpStreakIndex: dynamicChange((t) => ({
            currentStreakIndex: t.currentStreakIndex + 1
        })),
        bumpStreak: dynamicChange(bumpStreakChange),
        resetStreak: staticChange({
            status: status.active,
            streakIterations: 1,
            currentStreakIndex: 1
        })
    },
    extraReducers: {
        [reset]: (state, { payload }) =>
            tasksAdapter.getInitialState(payload ?? initialState),
        [resolveDay]: (state, { payload }) => {
            if (payload.streaks) {
                Object.values(state.entities).forEach((task) => {
                    if (task.status === status.active) {
                        task.streakIterations = 1;
                        task.currentStreakIndex = 1;
                    } else {
                        task.status = status.active;
                        dynamicChange(bumpStreakChange)(state, {
                            payload: task.id
                        });
                    }
                });
            }
        }
    }
});

export const reducer = tasksSlice.reducer;
export const actions = tasksSlice.actions;
export const selectors = tasksAdapter.getSelectors(
    (state) => state?.streaks ?? state
);
selectors.getStreak = selectors.selectById;

// /**
//  * @type {(state: unknown, id: EntityId) => number}
//  */
selectors.getStreakIndex = createSelector(
    selectors.getStreak,
    (task) => task.currentStreakIndex
);

selectors.getStreakIteration = createSelector(
    selectors.getStreak,
    (task) => task.streakIterations
);

selectors.getStreakValue = createSelector(selectors.getStreak, (task) =>
    task.status === status.active
        ? 0
        : task.currentStreakIndex === streakMax
        ? currencies.pizza
        : task.currentStreakIndex * task.streakIterations
);

selectors.getDaysPoints = createSelector(
    [selectors.selectIds, (state) => state],
    (taskIds, state) =>
        taskIds
            .map((id) => selectors.getStreakValue(state, id))
            .reduce(
                (acc, value) => {
                    if (Number.isInteger(value)) acc.points += value;
                    else
                        acc[currencies[value]] =
                            (acc?.[currencies[value]] ?? 0) + 1;
                    return acc;
                },
                { points: 0 }
            )
);
