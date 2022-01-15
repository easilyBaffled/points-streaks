import { nanoid } from "@reduxjs/toolkit";

const status = {
    active: "active",
    done:   "done"
};

/**
 *
 * @param {string} task
 * @param {TaskParts} optional
 * @return TaskStreak
 */
export function createTask( task, optional = {}) {
    return {
        currentStreakIndex: 1,
        id:                 nanoid(),
        status:             status.active,
        streakIterations:   1,
        task,
        ...optional
    };
}
