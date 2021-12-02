import { createNextState } from "@reduxjs/toolkit";
import reducer, {
  selectors,
  initialState,
  actions,
} from "../../../src/state/bank";

describe("actions", () => {
  it("should spendPoints", () => {
    const state = createNextState(initialState, (s) => {
      s.points = 1;
    });
    const actual = reducer(state, actions.spendPoints(1));
    const expected = initialState;

    expect(actual).to.eqls(expected);
  });
  it("should not spend points if value is too much", () => {
    const actual = reducer(initialState, actions.spendPoints(5));
    const expected = initialState;

    expect(actual).to.eqls(expected);
  });
  it("should addPoints", () => {
    const actual = reducer(initialState, actions.addPoints(1));
    const expected = createNextState(initialState, (s) => {
      s.points = 1;
    });

    expect(actual).to.eqls(expected);
  });
  it("should setPoints", () => {
    const actual = reducer(initialState, actions.setPoints(2));
    const expected = createNextState(initialState, (s) => {
      s.points = 2;
    });

    expect(actual).to.eqls(expected);
  });
  it("should spendSpecial", () => {
    const state = createNextState(initialState, (s) => {
      s.special.test = 1;
    });
    const actual = reducer(
      state,
      actions.spendSpecial({ amount: 1, type: "test" })
    );
    const expected = createNextState(initialState, (s) => {
      s.special.test = 0;
    });

    expect(actual).to.eqls(expected);
  });
  it("should addSpecial", () => {
    const actual = reducer(initialState, actions.addSpecial({ amount: 1 }));
    const expected = createNextState(initialState, (s) => {
      s.special.pizza = 1;
    });

    expect(actual).to.eqls(expected);
  });
  it("should setSpecial", () => {
    const actual = reducer(
      initialState,
      actions.setSpecial({ amount: 1, type: "pizza" })
    ).special.pizza;
    const expected = selectors.getPizza(initialState) + 1;

    expect(actual).to.eqls(expected);
  });
});

describe("selectors", () => {
  it("should get pizza", () => {
    const actual = selectors.getPizza(initialState);
    const expected = 0;

    expect(actual).to.eqls(expected);
  });

  it("should get special", () => {
    const actual = selectors.getSpecial(initialState, "pizza");
    const expected = 0;

    expect(actual).to.eqls(expected);
  });

  it("should get pizza's point value", () => {
    const actual = selectors.getSpecialValue(
      {
        points: 100,
        special: {
          pizza: 1,
        },
      },
      "pizza"
    );
    const expected = 5;

    expect(actual).to.eqls(expected);
  });
});
