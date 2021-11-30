import { createSlice } from "@reduxjs/toolkit";

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

const bankSliceDefinition = {
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
    setSpecial(s, { amount, type = "pizza" }) {
      s.special[type] = amount;
    },
  },
};
