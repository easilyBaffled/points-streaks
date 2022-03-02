import * as chrono from "chrono-node";
import { getTaskPosition, getTagDictHighestValue } from "./taggingDict";
import { splitTagsAndTask } from "./splitTaskString";
import { linearScale } from "./linearScale";

// import { createNodeTagTree, prettyPrintCatTree } from "./createTagTree";

// console.log(prettyPrintCatTree(createNodeTagTree(tasks)));

// const format = (date) => {
//   return date
//     ? new Intl.DateTimeFormat({ dateStyle: "medium" }).format(new Date(date))
//     : date;
// };

export function zeroTime(date = new Date()) {
	return new Date(date).setHours(0, 0, 0, 0);
}

function mod(delta, age) {
	// https://codepen.io/oscarsaharoy/full/eYggrme
	return delta;
}

function getDistance(x, y) {
	return Math.sqrt(x * x + y * y);
}

export function parseAndSort(tasks) {
	const parsedTime = tasks
		.map((task) => {
			const [timing] = task.fullTask.split(" ");
			const { qualifier, date } =
			timing.match(/#(?<qualifier>on|by)?-?(?<date>\w+)/)?.groups ?? {};
			const parsedDate = chrono.casual.parseDate(date, new Date(), {
				forwardDate: false
			});
			const dueDate = zeroTime(parsedDate);

			if (date === "decay" || date === "none") {
				return Object.assign(task, {
					delta: Infinity,
					age: Infinity,
					urgency: Infinity
				});
			}

			const now = Date.now();
			const age = now - task.created_at;
			const delta = dueDate - now;
			const urgency = mod(delta, age);

			if (qualifier === "on" && dueDate !== zeroTime()) {
				return Object.assign(task, {
					dueDate: new Intl.DateTimeFormat("en-US").format(dueDate),
					delta: delta * 100,
					age: age * 100,
					urgency: urgency * 100
				});
			}

			return Object.assign(task, {
				dueDate: new Intl.DateTimeFormat("en-US").format(dueDate),
				delta,
				age,
				urgency
			});
		})
		.map((task) => {
			const [__, ...tags] = splitTagsAndTask(task.fullTask)[0].split(" ");

			return Object.assign(task, { tagsPosition: getTaskPosition(tags) });
		})

		.sort((a, b) => {
			return a.urgency - b.urgency;
		});

	const mostUrgent = parsedTime?.[0]?.urgency ?? 0; // smallest
	const leastUrgent = parsedTime.filter((t) => t.urgency !== Infinity).at(-1)
		?.urgency ?? 0;

	const mappedTasks = parsedTime.map((task) => {
		const x = linearScale(
			Math.min(task.urgency, leastUrgent),
			mostUrgent,
			leastUrgent,
			0,
			getTagDictHighestValue()
		);
		const y = getTagDictHighestValue() - task.tagsPosition;

		return Object.assign(task, {
			distance: getDistance(x, y),
			x,
			y,
			"x (urgency)": x,
			"y (tag rank)": y,
			pos: { x, y }
		});
	}).sort((a, b) => {
		return a.distance - b.distance;
	});

	console.table(mappedTasks.reduce((acc, {
		fullTask,
		urgency,
		distance,
		tagsPosition,
		x,
		y
	}) => {
		return {
			...acc,
			[fullTask]: {
				urgency,
				distance,
				tagsPosition,
				x,
				y
			}
		};
	}, {}));
	return mappedTasks;
}
