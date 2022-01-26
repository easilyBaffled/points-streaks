import { createSelector } from "@reduxjs/toolkit";
import { groupBy } from "lodash";
import { tasksAdapter } from "@/features/task";
import { resolveDay } from "@/state/actions";

export const selectors = tasksAdapter.getSelectors(
    ( state ) => state?.tasks ?? state
);
selectors.getTask = selectors.selectById;
selectors.getValue = createSelector( selectors.getTask, ( task ) => task.value );
selectors.getDaysPoints = createSelector(
    [ selectors.selectIds, ( state ) => state ],
    ( taskIds, state ) =>
        taskIds.reduce( ( sum, id ) => sum + selectors.getValue( state, id ), 0 )
);

selectors.getHistory = createSelector(
    ( s ) => s.tasks,
    ( s ) => s.history
);
selectors.getHistoricalTasks = createSelector(
    selectors.selectAll,
    selectors.getHistory,
    ( entities, history ) => entities.filter( ( task ) => task && history[ task.id ])
);

selectors.getHistoryListGroupedByDate = createSelector(
    selectors.getHistoricalTasks,
    ( taskList ) =>
        groupBy(
            taskList,
            ( task ) =>
                task?.history.find( ( h ) => h.action.type === resolveDay().type )
                    ?.date ?? Date.now()
        )
);

selectors.getActiveTasks = createSelector(
    selectors.selectAll,
    selectors.getHistory,
    ( entities, history ) => entities.filter( ( task ) => task && !history[ task.id ])
);
