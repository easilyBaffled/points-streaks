/**
 * For a Task I need a way to
	- [ ] increment the streak
	- [ ] mark a task as active
	- [ ] reset an active streak
	- [ ] increment a streaks value
 */
import reducer, {
  a,
  actions,
  initialState,
  selectors,
  status,
  streakMax,
} from "../../../src/state/tasks";
import { _modifyEntity } from "./modifyEntity";

const modifyEntity = _modifyEntity(initialState);

describe("Task Actions", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).to.eqls(initialState);
  });

  it("should mark an active task as done", () => {
    const actual = reducer(initialState, actions.markTaskDone(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });

  it("should mark an done task as active", () => {
    const state = modifyEntity(a, (e) => (e.status = status.done));
    const actual = reducer(state, actions.markTaskActive(a));
    const expected = initialState;

    expect(actual).to.eqls(expected);
  });

  it("should increase currentStreakIndex", () => {
    const actual = reducer(initialState, actions.bumpStreak(a));
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
    const actual = selectors.selectById(initialState, a);
    const expected = initialState.entities[a];

    expect(actual).to.eqls(expected);
  });

  it("should reset modifiable stats", () => {
    const state = reducer(
      reducer(initialState, actions.bumpStreakIterations(a)),
      actions.markTaskDone(a)
    );

    const actual = reducer(state, actions.resetStreak(a));
    const expected = initialState;

    expect(actual).to.eqls(expected);
  });
});
