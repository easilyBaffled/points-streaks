import store, { actions, initialState } from "../../../src/state";
import {
  a,
  actions as taskActions,
  selectors as tasks,
} from "../../../src/state/tasks";
import { selectors as bank } from "../../../src/state/bank";

const actions = {};
const initialState = {};
const reducer = () => {};
function formIt([string]) {
  return (fn) => it(string.replace(/^(\s+)/gm, ""), fn);
}

describe("resolve day", () => {
  describe("with done tasks", () => {
    beforeEach(() => {
      store.dispatch(actions.reset());
    });
    formIt`
 		bank: 0								| bank: 1
 		- [x] task: [ 1, 2, 3, 4, 5, 🍕]	| - [ ] task: [ x, 2, 3, 4, 5, 🍕]
	`(() => {
      const state = store.dispatch(taskActions.markTaskDone(a));
      const nextState = reducer(state, actions.resolveDay());
      const actual = {
        points: bank.getPoints(nextState),
        a: tasks.getTaskStreakIndex(nextState, a.id),
      };
      const expected = {
        points: 1,
        a: 1,
      };

      expect(actual).to.eqls(expected);
    });
  });
});
/**
 * bank: 0
 * - [x] task: [ 1, 2, 3, 4, 5, 🍕]
 *
 * resolve
 *
 * bank: 1
 * - [ ] task: [ x, 2, 3, 4, 5, 🍕]
 *
 * when a day resolves
  if a task was marked complete
  then the tasks streak is incremented
  and the task is marked active
  and points are added to the bank
 */
// I need a way to check if a task was complete
// I need a way to increment the streak
// I need a way to mark a task as active
// I need a way to add a certain amount of points to the bank

/**
 * bank: 0
 * - [x] task: [ x, 2, 3, 4, 5 🍕]
 *
 * resolve
 *
 * bank: 2
 * - [ ] task: [ x, x, 3, 4, 5 🍕]
 *
 * when a day resolves
  if a task was marked complete
  and the task had an active streak
  then the tasks streak is incremented
  and the task is marked active
  and points are added to the bank
 */

/**
 * bank: 0
 * - [x] task: [ x, x, x, x, x 🍕]
 *
 * resolve
 *
 * bank: 0 | 🍕
 * - [ ] task: [ 2, 3, 4, 5, 6 🍕]
 *
 * when a day resolves
  if a task was marked complete
  and the task was at the last entry in the iteration
  then the active streak is reset
  and a special value is added to the bank
  and the entire streaks value is incremented
 */

/**
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5, 🍕]
 *
 * resolve
 *
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5, 🍕]
 *
 * When the day resolves
 * 	if no tasks were marked complete
	 then no tasks are toggled
	 and no points are added to the bank
 */

/**
 * bank: 0
 * - [ ] task: [ x, 3, 4, 5, 6 🍕]
 *
 * resolve
 *
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5 🍕]
 *
 * When the day resolves
  if no tasks were marked complete
  and a task had an active streak
  then the active streak is reset
 **/
