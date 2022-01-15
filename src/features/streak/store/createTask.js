import { nanoid } from "@reduxjs/toolkit";
import { status } from "@/features/streak";

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
