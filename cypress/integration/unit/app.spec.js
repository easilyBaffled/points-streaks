import store, { actions } from "../../../src/state";
import {
  a,
  actions as taskActions,
  selectors as tasks,
} from "../../../src/state/tasks";
import { selectors as bank } from "../../../src/state/bank";

const dispatchPipe = (...actions) => {
  actions.reduce((s, action) => store.dispatch(action), {});
  return store.getState();
};

describe("resolve day", () => {
  describe("with done tasks", () => {
    beforeEach(() => {
      store.dispatch(actions.reset());
    });

    [
      [
        `
 			bank: 0								| bank: 1
 			- [x] task: [ 1, 2, 3, 4, 5, 🍕]	| - [ ] task: [ x, 2, 3, 4, 5, 🍕]
		`,
        () => {
          const nextState = dispatchPipe(
            taskActions.markTaskDone(a),
            actions.resolveDay()
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 1,
            a: 1,
          };

          expect(actual).to.eqls(expected);
        },
      ],
      [
        `
 			bank: 0								| bank: 2
 			- [x] task: [ x, 2, 3, 4, 5, 🍕]	| - [ ] task: [ x, x, 3, 4, 5, 🍕]
		`,
        () => {
          const nextState = dispatchPipe(
            taskActions.bumpStreakIndex(a),
            taskActions.markTaskDone(a),
            actions.resolveDay()
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 2,
            a: 2,
          };

          expect(actual).to.eqls(expected);
        },
      ],
      [
        `
 			bank: 0	| 0							| bank: 0 | 🍕
 			- [x] task: [ x, x, x, x, x, 🍕]	| - [ ] task: [ 2, 3, 4, 5, 6, 🍕]
		`,
        () => {
          const nextState = dispatchPipe(
            taskActions.bumpStreakIndex(a),
            taskActions.bumpStreakIndex(a),
            taskActions.bumpStreakIndex(a),
            taskActions.bumpStreakIndex(a),
            taskActions.bumpStreakIndex(a),
            taskActions.markTaskDone(a),
            actions.resolveDay()
          );

          const actual = {
            points: bank.getPoints(nextState),
            pizza: bank.getPizza(nextState),
            a: {
              streakIterations: tasks.getTaskStreakIteration(nextState, a),
              currentStreakIndex: tasks.getTaskStreakIndex(nextState, a),
            },
          };
          const expected = {
            points: 0,
            pizza: 0,
            a: {
              streakIterations: 1,
              currentStreakIndex: 0,
            },
          };

          expect(actual).to.eqls(expected);
        },
      ],
    ].forEach(([name, test]) => {
      it(name.replace(/^(\s+)/gm, ""), test);
    });
  });
  describe("with no tasks completed", () => {
    beforeEach(() => {
      store.dispatch(actions.reset());
    });

    [
      [
        `
 			bank: 0								| bank: 0
 			- [ ] task: [ 1, 2, 3, 4, 5, 🍕 ]	| - [ ] task: [ 1, 2, 3, 4, 5, 🍕 ]
		`,
        () => {
          store.dispatch(actions.resolveDay());
          const nextState = store.getState();
          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 0,
            a: 0,
          };

          expect(actual).to.eqls(expected);
        },
      ],
      [
        `
 			bank: 0								| bank: 0
 			- [ ] task: [ x, 2, 3, 4, 5, 🍕]	| - [ ] task: [ 1, 2, 3, 4, 5, 🍕]
		`,
        () => {
          const nextState = dispatchPipe(
            taskActions.bumpStreakIndex(a),
            actions.resolveDay()
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 0,
            a: 0,
          };

          expect(actual).to.eqls(expected);
        },
      ],
    ].forEach(([name, test]) => {
      it(name.replace(/^(\s+)/gm, ""), test);
    });
  });
});
