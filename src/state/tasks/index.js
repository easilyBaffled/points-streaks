import {
	createEntityAdapter,
	createSlice,
	configureStore,
	nanoid,
} from '@reduxjs/toolkit'

export const status = {
	active: "active",
	done: "done"
}

//https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/
/**
 * @typedef { import("./index").Task } Task
 * @typedef { import("./index").Bank } Bank
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskParts } TaskParts
 */

/**
 *
 * @param {string} task
 * @param {TaskParts} optional
 * @return Task
 */
function createTask(task, optional = {}) {
	return {
		id: nanoid(),
		status: status.active,
		task,
		streakIterations: 0,
		currentStreakIndex: 0,
		...optional
	}
}

const tasksAdapter = createEntityAdapter()

export const a = 'a';
export const b = 'b'

export const initialState = {
	ids: [a, b],
	entities: {
		[a]: createTask(a, { id: a }),
		[b]: createTask(b, { id: b }),
	}
}

const staticChange = changes =>
	(state, { payload }) => tasksAdapter.updateOne( state, { id: payload, changes } )

const dynamicChange = updater =>
	(state, { payload }) =>
		tasksAdapter.updateOne( state, { id: payload, changes: updater(state.entities[payload]) } )


const tasksSlice = createSlice({
	name: 'tasks',
	initialState: tasksAdapter.getInitialState(initialState),
	reducers: {
		// Can pass adapter functions directly as case reducers.  Because we're passing this
		// as a value, `createSlice` will auto-generate the `taskAdded` action type / creator
		markTaskActive: staticChange({ status: status.active }),
		markTaskDone: staticChange({ status: status.done }),
		bumpStreakIterations: dynamicChange( t => ({ streakIterations: t.streakIterations + 1 }) )
		// taskAdded: tasksAdapter.addOne,
		// tasksLoading(state, action) {
		// 	if (state.loading === 'idle') {
		// 		state.loading = 'pending'
		// 	}
		// },
		// tasksReceived(state, action) {
		// 	if (state.loading === 'pending') {
		// 		// Or, call them as "mutating" helpers in a case reducer
		// 		tasksAdapter.setAll(state, action.payload)
		// 		state.loading = 'idle'
		// 	}
		// },
		// taskUpdated: tasksAdapter.updateOne,
	},
})

export default tasksSlice.reducer;
export const actions = tasksSlice.actions
export const selectors = tasksAdapter.getSelectors((state) => state?.tasks ?? state)


// const store = configureStore({
// 	reducer: {
// 		tasks: tasksSlice.reducer,
// 	},
// })
//
// // Check the initial state:
// console.log(store.getState().tasks)
// // {ids: [], entities: {}, loading: 'idle' }
//
// const tasksSelectors = tasksAdapter.getSelectors((state) => state.tasks)
//
// store.dispatch(taskAdded({ id: 'a', title: 'First' }))
// console.log(store.getState().tasks)
// // {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }
//
// store.dispatch(taskUpdated({ id: 'a', changes: { title: 'First (altered)' } }))
// store.dispatch(tasksLoading())
// console.log(store.getState().tasks)
// // {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }
//
// store.dispatch(
// 	tasksReceived([
// 		{ id: 'b', title: 'Task 3' },
// 		{ id: 'c', title: 'Task 2' },
// 	])
// )
//
// console.log(tasksSelectors.selectIds(store.getState()))
// // "a" was removed due to the `setAll()` call
// // Since they're sorted by title, "Task 2" comes before "Task 3"
// // ["c", "b"]
//
// console.log(tasksSelectors.selectAll(store.getState()))
// // All task entries in sorted order
// // [{id: "c", title: "Task 2"}, {id: "b", title: "Task 3"}]
//
//