import {
    createEntityAdapter,
    createSelector,
    createSlice,
    nanoid
} from "@reduxjs/toolkit";
import { reset } from "../../../state/actions/reset";
import { _dynamicChange, _staticChange } from "../../../utils";
import { resolveDay } from "../../../state/actions";

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
        value: 1,
        ...optional
    };
}

const tasksAdapter = createEntityAdapter();
const staticChange = _staticChange(tasksAdapter);

const dynamicChange = _dynamicChange(tasksAdapter);
const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksAdapter.getInitialState({ history: {} }),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
        toggleTaskStatus: dynamicChange((t) => ({
            status: t.status === status.active ? status.done : status.active
        })),
        markTaskActive: staticChange({ status: status.active }),
        markTaskDone: staticChange({ status: status.done }),
        restoreTask: (state, { payload: id }) => {
            state.history[id] = false;
            tasksAdapter.updateOne(state, { id, changes: status.active });
        }
    },
    extraReducers: {
        [reset]: (state, { payload }) => tasksAdapter.getInitialState(payload),
        [resolveDay]: (state, { payload }) => {
            if (payload.tasks) {
                Object.values(state.entities).forEach((task) => {
                    state.history[task.id] = true;
                });
            }
        }
    }
});

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
