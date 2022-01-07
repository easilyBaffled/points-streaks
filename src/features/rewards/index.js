import { nanoid } from "@reduxjs/toolkit";

/**
 *
 * @param {string|RewardParts} task
 * @param {RewardParts} optional
 * @return Task
 */
export function createTask( reward, optional = {}) {
    if ( typeof reward === "object" ) optional = reward;
    return {
        history: [],
        id:      nanoid(),
        reward,
        value:   1,
        ...optional
    };
}
