import { nanoid } from "@reduxjs/toolkit";

/**
 *
 * @param {string|TaskParts} task
 * @param {TaskParts} optional
 * @return Task
 */
export function createTask(task, optional = {}) {
    if (typeof task === "object") optional = task;
    return {
        id: nanoid(),
        status: status.active,
        task,
        value: 1,
        ...optional
    };
}
