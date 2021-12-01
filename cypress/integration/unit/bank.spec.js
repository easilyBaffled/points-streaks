import { createNextState } from "@reduxjs/toolkit";
import reducer, {
  selectors,
  initialState,
  actions,
} from "../../../src/state/bank";
import { _modifyEntity } from "./modifyEntity";

const modifyEntity = _modifyEntity(initialState);

describe("actions", () => {
  it("should spendPoints", () => {
    const actual = reducer(initialState, actions.spendPoints(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });
  it("should addPoints", () => {
    const actual = reducer(initialState, actions.addPoints(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });
  it("should setPoints", () => {
    const actual = reducer(initialState, actions.setPoints(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });
  it("should spendSpecial", () => {
    const actual = reducer(initialState, actions.spendSpecial(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

    expect(actual).to.eqls(expected);
  });
  it("should addSpecial", () => {
    const actual = reducer(initialState, actions.addSpecial(a));
    const expected = modifyEntity(a, (e) => (e.status = status.done));

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
