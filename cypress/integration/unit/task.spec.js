import {
  reducer,
  a,
  actions,
  b,
  testState,
  selectors,
  status,
  streakMax,
} from "../../../src/features/task";
import { _modifyEntity } from "./modifyEntity";
import { currencies } from "../../../src/state/bank";

const modifyEntity = _modifyEntity(testState);

describe("Task Actions", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).to.eqls(testState);
  });

  it("should mark an active task as done", () => {
    const actual = reducer(testState, actions.markTaskDone(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });

  it("should mark an done task as active", () => {
    const state = modifyEntity(a, (e) => (e.status = status.done));
    const actual = reducer(state, actions.markTaskActive(a));
    const expected = testState;

    expect(actual).to.eqls(expected);
  });

  it("should increase currentStreakIndex", () => {
    const actual = reducer(testState, actions.bumpStreak(a));
    const expected = modifyEntity(a, (e) => {
      e.currentStreakIndex += 1;
    });

    expect(actual).to.eqls(expected);
  });

  it("should wrap streak", () => {
    const state = modifyEntity(a, (e) => (e.currentStreakIndex = streakMax));
    const actual = reducer(state, actions.bumpStreak(a));
    const expected = modifyEntity(a, (e) => {
      e.streakIterations += 1;
      e.currentStreakIndex = 0;
    });

    expect(actual).to.eqls(expected);
  });

  it("should get entity by id", () => {
    const actual = selectors.selectById(testState, a);
    const expected = testState.entities[a];

    expect(actual).to.eqls(expected);
  });

  it("should reset modifiable stats", () => {
    const state = reducer(
      reducer(testState, actions.bumpStreakIterations(a)),
      actions.markTaskDone(a)
    );

    const actual = reducer(state, actions.resetStreak(a));
    const expected = testState;

    expect(actual).to.eqls(expected);
  });
});
describe("selectors", () => {
  describe("getTaskValue", () => {
    const state = reducer(testState, actions.markTaskDone(a));
    it("should return 0 because it hasn't been done", () => {
      const actual = selectors.getTaskValue(testState, a);
      const expected = 0;

      expect(actual).to.eqls(expected);
    });
    it("should return a point", () => {
      const actual = selectors.getTaskValue(state, a);
      const expected = 1;

      expect(actual).to.eqls(expected);
    });
    it("should return 2 points", () => {
      const newState = Array(6)
        .fill(actions.bumpStreak(a))
        .reduce(reducer, state);

      const actual = selectors.getTaskValue(newState, a);
      const expected = 2;

      expect(actual).to.eqls(expected);
    });
    it("should return a pizza", () => {
      const newState = Array(5)
        .fill(actions.bumpStreak(a))
        .reduce(reducer, state);

      const actual = selectors.getTaskValue(newState, a);
      const expected = currencies.pizza;

      expect(actual).to.eqls(expected);
    });
  });
  describe.only("getDaysPoints", () => {
    it("should collect just points", () => {
      const state = [actions.markTaskDone(a), actions.markTaskDone(b)].reduce(
        reducer,
        testState
      );

      const actual = selectors.getDaysPoints(state);
      const expected = {
        points: 2,
      };

      expect(actual).to.eqls(expected);
    });
    it("should collect pizza", () => {
      const state = Array(5)
        .fill(actions.bumpStreak(a))
        .concat(Array(5).fill(actions.bumpStreak(b)))
        .concat([actions.markTaskDone(a), actions.markTaskDone(b)])
        .reduce(reducer, testState);

      const actual = selectors.getDaysPoints(state);
      const expected = {
        points: 0,
        pizza: 2,
      };

      expect(actual).to.eqls(expected);
    });
    it("should collect all together", () => {
      const state = Array(5)
        .fill(actions.bumpStreak(a))
        .concat([actions.markTaskDone(a), actions.markTaskDone(b)])
        .reduce(reducer, testState);

      const actual = selectors.getDaysPoints(state);
      const expected = {
        points: 1,
        pizza: 1,
      };

      expect(actual).to.eqls(expected);
    });
  });
});
