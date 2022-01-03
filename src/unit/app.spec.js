import store, { actions } from "../state";
import {
    a,
    actions as streakActions,
    selectors as streakSelectors,
    testState
} from "../features/streak/store";
import { selectors as bank } from "../features/bank/store";
import { getDaysState } from "../state/resolveDaySelector";
import { resolveDay } from "../state/actions";

const dispatchPipe = ( ...actions ) => {
    actions.reduce( ( s, action ) => {
        if ( typeof action === "function" ) {
            if ( action.name === "tap" || action.name === "log" )
                action( store.getState() );
            else store.dispatch( action( store.getState() ) );
        } else store.dispatch( action );
    }, {});
    return store.getState();
};

describe( "resolve day", () => {
    beforeEach( () => {
        store.dispatch( actions.reset({ streaks: testState }) );
        store.dispatch( actions.setDate( "5/11/90" ) );
    });

    describe( "with done streakSelectors", () => {
        it(
            cy.clean`
 			bank: 0								| bank: 1
 			- [x] streak: [ 1, 2, 3, 4, 5, 🍕]	| - [ ] streak: [ x, 2, 3, 4, 5, 🍕]
		`,
            () => {
                const nextState = dispatchPipe(
                    streakActions.markTaskDone( a ),
                    ( s ) => resolveDay( getDaysState( s ) )
                );

                const actual = {
                    a:      streakSelectors.getStreakIndex( nextState, a ),
                    points: bank.getPoints( nextState )
                };
                const expected = {
                    a:      2,
                    points: 1
                };

                expect( actual ).to.eqls( expected );
            }
        );
        it(
            cy.clean`
 			bank: 0								| bank: 2
 			- [x] streak: [ x, 2, 3, 4, 5, 🍕]	| - [ ] streak: [ x, x, 3, 4, 5, 🍕]
		`,
            () => {
                const nextState = dispatchPipe(
                    streakActions.bumpStreakIndex( a ),
                    streakActions.markTaskDone( a ),
                    ( s ) => resolveDay( getDaysState( s ) )
                );

                const actual = {
                    a:      streakSelectors.getStreakIndex( nextState, a ),
                    points: bank.getPoints( nextState )
                };
                const expected = {
                    a:      3,
                    points: 2
                };

                expect( actual ).to.eqls( expected );
            }
        );
        it(
            cy.clean`
 			bank: 0	| 0							| bank: 0 | 🍕
 			- [x] streak: [ x, x, x, x, x, 🍕]	| - [ ] streak: [ 2, 3, 4, 5, 6, 🍕]
		`,
            () => {
                const nextState = dispatchPipe(
                    streakActions.bumpStreakIndex( a ),
                    streakActions.bumpStreakIndex( a ),
                    streakActions.bumpStreakIndex( a ),
                    streakActions.bumpStreakIndex( a ),
                    streakActions.bumpStreakIndex( a ),
                    streakActions.markTaskDone( a ),
                    ( s ) => resolveDay( getDaysState( s ) )
                );

                const actual = {
                    a: {
                        currentStreakIndex: streakSelectors.getStreakIndex(
                            nextState,
                            a
                        ),
                        streakIterations: streakSelectors.getStreakIteration(
                            nextState,
                            a
                        )
                    },
                    pizza:  bank.getPizza( nextState ),
                    points: bank.getPoints( nextState )
                };
                const expected = {
                    a: {
                        currentStreakIndex: 1,
                        streakIterations:   2
                    },
                    pizza:  1,
                    points: 0
                };

                expect( actual ).to.eqls( expected );
            }
        );
    });
    describe( "with no streakSelectors completed", () => {
        it(
            cy.clean`
 			bank: 0								| bank: 0
 			- [ ] streak: [ 1, 2, 3, 4, 5, 🍕 ]	| - [ ] streak: [ 1, 2, 3, 4, 5, 🍕 ]
		`,
            () => {
                store.dispatch( resolveDay( getDaysState( store.getState() ) ) );
                const nextState = store.getState();
                const actual = {
                    a:      streakSelectors.getStreakIndex( nextState, a ),
                    points: bank.getPoints( nextState )
                };
                const expected = {
                    a:      1,
                    points: 0
                };

                expect( actual ).to.eqls( expected );
            }
        );
        it(
            cy.clean`
 			bank: 0								| bank: 0
 			- [ ] streak: [ x, 2, 3, 4, 5, 🍕]	| - [ ] streak: [ 1, 2, 3, 4, 5, 🍕]
		`,
            () => {
                const nextState = dispatchPipe(
                    streakActions.bumpStreakIndex( a ),
                    ( s ) => resolveDay( getDaysState( s ), s )
                );

                const actual = {
                    a:      streakSelectors.getStreakIndex( nextState, a ),
                    points: bank.getPoints( nextState )
                };
                const expected = {
                    a:      1,
                    points: 0
                };

                expect( actual ).to.eqls( expected );
            }
        );
    });
});
