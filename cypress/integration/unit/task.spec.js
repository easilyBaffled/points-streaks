/**
 * For a Task I need a way to
	- [ ] increment the streak
	- [ ] mark a task as active
	- [ ] reset an active streak
	- [ ] increment a streaks value
 */
import { createNextState } from '@reduxjs/toolkit'
import reducer, { actions, a, b, initialState, status, selectors } from '../../../src/state/tasks'

function modifyEnity( id, updater, state = initialState ) {
	return createNextState( state, s => {
		updater(s.entities[id])
	} )
}
console.tap = (v, ...rest) => (console.log(v, ...rest), v)
it('should return the initial state', () => {
	expect(reducer(undefined, {})).to.eqls(initialState)
})

it('should mark an active task as done', () => {
	const actual = reducer( initialState, actions.markTaskDone(a));
	const expected = modifyEnity( a, e => e.status = status.done )


	expect(actual).to.eqls(expected)
})

it('should mark an done task as active', () => {
	const state = modifyEnity( a, e => e.status = status.done )
	const actual = reducer( state, actions.markTaskActive(a));
	const expected = initialState

	expect(actual).to.eqls(expected)
})

it('should bumpStreakIterations', () => {
	const actual = reducer( initialState, actions.bumpStreakIterations(a));
	const expected = modifyEnity(a, e => { e.streakIterations += 1 })

	expect(actual).to.eqls(expected)
})

it('should get entity by id', () => {
	const actual = selectors.selectById(initialState, a);
	const expected = initialState.entities[a]

	expect(actual).to.eqls(expected)
})
