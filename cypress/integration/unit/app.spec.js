import store, { actions } from "../../../src/state";
import {
  a,
  actions as taskActions,
  selectors as tasks,
  testState,
} from "../../../src/features/task/store";
import { selectors as bank } from "../../../src/state/bank";
import { getDaysState } from "../../../src/state/resolveDaySelector";

const dispatchPipe = (...actions) => {
  actions.reduce((s, action) => {
    if (typeof action === "function") {
      store.dispatch(action(store.getState()));
    } else store.dispatch(action);
  }, {});
  return store.getState();
};

describe("resolve day", () => {
  beforeEach(() => {
    store.dispatch(actions.reset(testState));
    store.dispatch(actions.setDate("5/11/90"));
  });
  describe("with done tasks", () => {
    [
      [
        `
 			bank: 0								| bank: 1
 			- [x] task: [ 1, 2, 3, 4, 5, 🍕]	| - [ ] task: [ x, 2, 3, 4, 5, 🍕]
		`,
        () => {
          const nextState = dispatchPipe(taskActions.markTaskDone(a), (s) =>
            actions.resolveDay(getDaysState(s))
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 1,
            a: 2,
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
            (s) => actions.resolveDay(getDaysState(s))
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 2,
            a: 3,
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
            (s) => actions.resolveDay(getDaysState(s))
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
            pizza: 1,
            a: {
              streakIterations: 2,
              currentStreakIndex: 1,
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
    [
      [
        `
 			bank: 0								| bank: 0
 			- [ ] task: [ 1, 2, 3, 4, 5, 🍕 ]	| - [ ] task: [ 1, 2, 3, 4, 5, 🍕 ]
		`,
        () => {
          store.dispatch(actions.resolveDay(getDaysState(store.getState())));
          const nextState = store.getState();
          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 0,
            a: 1,
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
          const nextState = dispatchPipe(taskActions.bumpStreakIndex(a), (s) =>
            actions.resolveDay(getDaysState(s), s)
          );

          const actual = {
            points: bank.getPoints(nextState),
            a: tasks.getTaskStreakIndex(nextState, a),
          };
          const expected = {
            points: 0,
            a: 1,
          };

          expect(actual).to.eqls(expected);
        },
      ],
    ].forEach(([name, test]) => {
      it(name.replace(/^(\s+)/gm, ""), test);
    });
  });
});
