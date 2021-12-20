import { nanoid } from "@reduxjs/toolkit";

/**
 *
 * @param {string} task
 * @param {TaskParts} optional
 * @return Task
 */
export function createTask(task, optional = {}) {
    return {
        id: nanoid(),
        status: status.active,
        task,
        value: 1,
        ...optional
    };
}
