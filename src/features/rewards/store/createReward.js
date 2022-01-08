import { nanoid } from "@reduxjs/toolkit";

/**
 *
 * @param {string|RewardParts} reward
 * @param {RewardParts} optional
 * @return Reward
 */
export function createReward( reward, optional = {}) {
    if ( typeof reward === "object" ) optional = reward;
    return {
        history: [],
        id:      nanoid(),
        reward,
        value:   75,
        ...optional
    };
}
