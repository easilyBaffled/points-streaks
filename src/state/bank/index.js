import { createSelector, createSlice } from "@reduxjs/toolkit";

/** @type {Bank} */
export const initialState = {
  points: 0,
  special: {
    pizza: 0,
  },
};

const specialWorthCalculators = {
  pizza: (s) => s.points * 0.05,
};

export const bankSliceDefinition = {
  name: "bank",
  initialState,
  reducers: {
    spendPoints(s, { amount }) {
      if (amount <= s.points) s.points -= amount;
    },
    addPoints(s, { amount }) {
      s.points += amount;
    },
    setPoints(s, { amount }) {
      s.points = amount;
    },
    spendSpecial(s, { amount, type = "pizza" }) {
      if (amount <= s.special[type]) s.special[type] -= amount;
    },
    addSpecial(s, { amount, type = "pizza" }) {
      s.special[type] += amount;
    },
    setSpecial(s, { payload: { amount, type = "pizza" } }) {
      console.log(amount, type);
      s.special[type] = amount;
    },
  },
  selectors: {},
};

/**
 * Selectors
 */
const getSpecial = (state, type) => (state?.bank ?? state).special[type];
const getPizza = (state) => (state?.bank ?? state).special.pizza;
const getPoints = (state) => (state?.bank ?? state).points;
const getSpecialValue = (state, type) => specialWorthCalculators[type](state);
export const selectors = {
  getPizza,
  getSpecialValue,
  getPoints,
  getSpecial,
};

export const slice = createSlice(bankSliceDefinition);
export default slice.reducer;
export const actions = slice.actions;
