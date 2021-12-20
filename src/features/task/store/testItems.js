import { creatTask } from "./createTask";
export const a = "a";
export const b = "b";

export const testState = {
    ids: [a, b],
    entities: {
        [a]: createTask(a, { id: a }),
        [b]: createTask(b, { id: b })
    }
};
