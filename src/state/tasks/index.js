import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { reset } from "../reset";
import { currencies } from "../bank";

export const status = {
  active: "active",
  done: "done",
};

/**
 *
 * @param {string} task
 * @param {TaskParts} optional
 * @return Task
 */
function createTask(task, optional = {}) {
  return {
    id: nanoid(),
    status: status.active,
    task,
    streakIterations: 1,
    currentStreakIndex: 1,
    ...optional,
  };
}

export const streakMax = 6;

const tasksAdapter = createEntityAdapter();

export const a = "a";
export const b = "b";

export const initialState = {
  ids: [a, b],
  entities: {
    [a]: createTask(a, { id: a }),
    [b]: createTask(b, { id: b }),
  },
};

const staticChange =
  (changes) =>
  (state, { payload }) =>
    tasksAdapter.updateOne(state, { id: payload, changes });

const dynamicChange =
  (updater) =>
  (state, { payload }) =>
    tasksAdapter.updateOne(state, {
      id: payload,
      changes: updater(state.entities[payload]),
    });

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(initialState),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
    markTaskActive: staticChange({ status: status.active }),
    markTaskDone: staticChange({ status: status.done }),
    bumpStreakIterations: dynamicChange((t) => ({
      streakIterations: t.streakIterations + 1,
    })),
    bumpStreakIndex: dynamicChange((t) => ({
      currentStreakIndex: t.currentStreakIndex + 1,
    })),
    bumpStreak: dynamicChange((t) => {
      if (t.currentStreakIndex === streakMax) {
        return {
          streakIterations: t.streakIterations + 1,
          currentStreakIndex: 1,
        };
      }
      return {
        currentStreakIndex: t.currentStreakIndex + 1,
      };
    }),
    resetStreak: staticChange({
      status: status.active,
      streakIterations: 1,
      currentStreakIndex: 1,
    }),
  },
  extraReducers: {
    [reset]: () => tasksAdapter.getInitialState(initialState),
  },
});

export default tasksSlice.reducer;
export const actions = tasksSlice.actions;
export const selectors = tasksAdapter.getSelectors(
  (state) => state?.tasks ?? state
);
selectors.getTask = selectors.selectById;

/**
 * @type {(state: unknown, id: EntityId) => number}
 */
selectors.getTaskStreakIndex = createSelector(
  selectors.getTask,
  (task) => task.currentStreakIndex
);

selectors.getTaskStreakIteration = createSelector(
  selectors.getTask,
  (task) => task.streakIterations
);

selectors.getTaskValue = createSelector(selectors.getTask, (task) =>
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
      .map((id) => selectors.getTaskValue(state, id))
      .reduce(
        (acc, value) => {
          if (Number.isInteger(value)) acc.points += value;
          else acc[currencies[value]] = (acc?.[currencies[value]] ?? 0) + 1;
          return acc;
        },
        { points: 0 }
      )
);
