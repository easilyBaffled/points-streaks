export interface Bank {
    points: number;
    special: { [key: string]: number };
}

export interface TaskBase {
    id: string;
    status: "active" | "done";
    task: string;
}

export interface Task extends TaskBase {
    value: number;
}

export interface TaskStreak extends TaskBase {
    streakIterations: number;
    currentStreakIndex: number;
}

export type TaskParts = Partial<TaskBase>;

export interface TaskDict {
    [id: string]: TaskStreak;
}

export interface App {
    bank: Bank;
    date: Date;
    tasks: {
        ids: [id: string];
        entities: TaskDict;
    };
}

export { dynamicChange } from "./utils";
export { staticChange } from "./utils";

export interface Reward {
    id: string;
    reward: string;
    value: number;
}

export type RewardParts = Partial<Reward>;
