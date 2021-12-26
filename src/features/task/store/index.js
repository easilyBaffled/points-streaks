import {
    createEntityAdapter,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import { reset } from "../../../state/actions/reset";
import { _dynamicChange, _staticChange } from "../../../utils";
import { resolveDay } from "../../../state/actions";
import { createTask } from "./createTask";
export { a, b, testState } from "./testItems";
export const status = {
    active: "active",
    done: "done"
};
const tasksAdapter = createEntityAdapter();
const staticChange = _staticChange(tasksAdapter);

const dynamicChange = _dynamicChange(tasksAdapter);
const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksAdapter.getInitialState({ history: {} }),
    reducers: {
        createTasks: (state, { payload: tasks }) =>
            tasksAdapter.addMany(
                state,
                tasks.map((t) => createTask(t))
            ),
        createTask: (state, { payload }) =>
            tasksAdapter.addOne(state, createTask(payload)),
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
        toggleTaskStatus: dynamicChange((t) => ({
            status: t.status === status.active ? status.done : status.active
        })),
        markTaskActive: staticChange({ status: status.active }),
        markTaskDone: staticChange({ status: status.done }),
        restoreTask: (state, { payload: id }) => {
            state.history[id] = false;
            tasksAdapter.updateOne(state, {
                id,
                changes: { status: status.active }
            });
        }
    },
    extraReducers: {
        [reset]: () => tasksAdapter.getInitialState({ history: {} }),
        [resolveDay]: (state, { payload }) => {
            if (payload.tasks) {
                Object.values(state.entities).forEach((task) => {
                    if (task.status === status.done)
                        state.history[task.id] = true;
                });
            }
        }
    }
});

export const initialState = tasksSlice.getInitialState();
export const reducer = tasksSlice.reducer;
export const actions = tasksSlice.actions;
export const selectors = tasksAdapter.getSelectors(
    (state) => state?.tasks ?? state
);
selectors.getTask = selectors.selectById;
selectors.getValue = createSelector(selectors.getTask, (task) => task.value);
selectors.getDaysPoints = createSelector(
    [selectors.selectIds, (state) => state],
    (taskIds, state) =>
        taskIds.reduce((sum, id) => sum + selectors.getValue(state, id), 0)
);

selectors.getHistory = createSelector(
    (s) => s.tasks,
    (s) => s.history
);
selectors.getHistoricalTasks = createSelector(
    selectors.selectAll,
    selectors.getHistory,
    (entities, history) => entities.filter((task) => history[task.id])
);
selectors.getActiveTasks = createSelector(
    selectors.selectAll,
    selectors.getHistory,
    (entities, history) => entities.filter((task) => !history[task.id])
);
