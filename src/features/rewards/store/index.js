import {
    createEntityAdapter,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import { createReward } from "./createReward";
import { reset } from "@/state/actions/reset";
import { _dynamicChange } from "@/utils";
import { purchaseReward } from "@/state/actions/purchaseReward";

const rewardsAdapter = createEntityAdapter();

const dynamicChange = _dynamicChange( rewardsAdapter );

function doesPayloadHaveId( state, action ) {
    const maybeId = action?.payload?.id ?? action.payload;
    return typeof maybeId === "string" && maybeId in state.entities
        ? maybeId
        : null;
}

const updateEntityHistory = dynamicChange( ( s, action ) => {
    if ( !s.history ) s.history = [];

    s.history.push({
        action,
        date: Date.now()
    });
});

const entitiesWithHistory = ( reducer ) => ( state, action ) => {
    const newState = reducer( state, action );
    const payloadDoesHaveId = doesPayloadHaveId( newState, action );
    return payloadDoesHaveId ? updateEntityHistory( newState, action ) : newState;
};

function includeHistory( reducers ) {
    return Object.fromEntries(
        Object.entries( reducers ).map( ([ name, reducer ]) => {
            const reducerWithInternalHistory = entitiesWithHistory( reducer );

            return [ name, reducerWithInternalHistory ];
        })
    );
}

export const initialState = rewardsAdapter.getInitialState({ history: {} });

const rewardsSlice = createSlice({
    extraReducers: includeHistory({
        [ reset ]: () => initialState
    }),
    initialState,
    name:     "rewards",
    reducers: includeHistory({
        createReward: ( state, { payload }) =>
            rewardsAdapter.addOne( state, createReward( payload ) ),
        deleteReward: ( state, { payload: id }) =>
            rewardsAdapter.removeOne( state, id ),
        [ purchaseReward ]: ( state, { payload: { id } }) => {
            state.history[ id ] = true;
            return state;
        },
        restoreReward: ( state, { payload: id }) => {
            state.history[ id ] = false;
            return state;
        }
    })
});

export const reducer = rewardsSlice.reducer;
export const actions = rewardsSlice.actions;
export const selectors = rewardsAdapter.getSelectors( ( state ) =>
    console.tap( state?.rewards ?? state )
);
selectors.getHistory = createSelector(
    ( s ) => s.tasks,
    ( s ) => s.history
);
