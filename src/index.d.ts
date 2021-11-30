export interface Bank {
	points: number;
	special: {
		pizza: number;
	};
}

export interface Task {
	id: string;
	status: "active" | "done";
	task: string;
	streakIterations: number;
	currentStreakIndex: number;
}

export type TaskParts = Partial<Task>

export interface TaskDict {
	[id: string]: Task;
}

export interface App {
	bank: Bank;
	date: Date;
	tasks: {
		ids: [id: string];
		entities: TaskDict;
	};
}
