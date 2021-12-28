import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions/reset";
import { resolveDay } from "../actions";

export const currencies = {
    pizza: "pizza"
};

/** @type {Bank} */
export const initialState = {
    points:  0,
    special: {
        [ currencies.pizza ]: 0
    }
};

const specialWorthCalculators = {
    pizza: ( s ) => s.points * 0.05
};

export const bankSliceDefinition = {
    extraReducers: {
        [ reset ]:      () => initialState,
        [ resolveDay ]: ( s, { payload: { bank } }) => {
            Object.entries( bank ).forEach( ([ k, v ]) => {
                if ( k === "points" ) s.points += v;
                else s.special[ k ] = ( s.special[ k ] ?? 0 ) + v;
            });
        }
    },
    initialState,
    name:     "bank",
    reducers: {
        addPoints( s, { payload: amount }) {
            s.points += amount;
        },
        addSpecial( s, { payload: { amount, type = "pizza" } }) {
            s.special[ type ] += amount;
        },
        setPoints( s, { payload: amount }) {
            s.points = amount;
        },
        setSpecial( s, { payload: { amount, type = "pizza" } }) {
            s.special[ type ] = amount;
        },
        spendPoints( s, { payload: amount }) {
            if ( amount <= s.points ) s.points -= amount;
        },
        spendSpecial( s, { payload: { amount, type = "pizza" } }) {
            if ( amount <= s.special[ type ]) s.special[ type ] -= amount;
        }
    }
};

/**
 * Selectors
 */
const getSpecial = ( state, type ) => ( state?.bank ?? state ).special[ type ];
const getPizza = ( state ) => ( state?.bank ?? state ).special.pizza;
const getPoints = ( state ) => ( state?.bank ?? state ).points;
const getSpecialValue = ( state, type ) => specialWorthCalculators[ type ]( state );
export const selectors = {
    getPizza,
    getPoints,
    getSpecial,
    getSpecialValue
};

export const slice = createSlice( bankSliceDefinition );
export default slice.reducer;
export const actions = slice.actions;
