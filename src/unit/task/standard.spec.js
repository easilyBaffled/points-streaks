// template test

import { createNextState } from "@reduxjs/toolkit";
import { flow } from "lodash";
import {
    a,
    actions,
    createTask,
    reducer,
    status,
    testState,
    initialState
} from "../../features/task";

import { _modifyEntity } from "../modifyEntity";
import { resolveDay } from "../../state/actions";

const modifyEntity = _modifyEntity( testState );

const baseState = {
    entities: {},
    history:  {},
    ids:      []
};

function withHistory( entity, action ) {
    entity.history.push({ action, date: Date.now() });
    return entity;
}

const nextState = ( fn ) => createNextState( baseState, fn );

describe( "Task CRUD", () => {
    it( "should create a new task", () => {
        const action = actions.createTask({ id: a, task: a });
        const actual = reducer( initialState, action );
        const expected = nextState( ( s ) => {
            s.ids.push( a );
            s.entities[ a ] = createTask( a, { id: a });
            withHistory( s.entities[ a ], action );
        });

        expect( actual ).to.eqls( expected );
    });
    it( "should mark a task as done", () => {
        const action = actions.markTaskDone( a );
        const actual = reducer( testState, action );
        const expected = modifyEntity( a, ( e ) => {
            e.status = status.done;
            withHistory( e, action );
        });

        expect( actual ).to.eqls( expected );
    });
    it( "should mark a task as active", () => {
        const action = actions.markTaskActive( a );
        const actual = reducer( testState, action );
        const expected = modifyEntity( a, ( e ) => {
            e.status = status.active;
            withHistory( e, action );
        });

        expect( actual ).to.eqls( expected );
    });
    it( "should move a done task to history", () => {
        const nextState = reducer( testState, actions.markTaskDone( a ) );
        const actual = reducer( nextState, resolveDay({ tasks: true }) );
        const expected = createNextState( nextState, ( s ) => {
            s.history[ a ] = true;
            s.entities[ a ].value = 0;
            withHistory( s.entities[ a ], resolveDay({ tasks: true }) );
        });

        expect( actual ).to.eqls( expected );
    });
    it( "should move a task out of history and mark as active", () => {
        const actual = flow(
            ( s ) => reducer( s, actions.markTaskDone( a ) ),
            ( s ) => reducer( s, resolveDay({ tasks: true }) ),
            ( s ) => reducer( s, actions.restoreTask( a ) )
        )( testState );

        const expected = createNextState( actual, ( s ) => {
            s.entities[ a ].status = status.active;
            s.entities[ a ].value = 0;
            s.history[ a ] = false;
        });

        expect( actual ).to.eqls( expected );
    });
});

/*
when nothing has changed
and the day resolves
```
bank: 0						| bank: 0
history: {}					| history: {}
streakSelectors: { - [ ] task: 1 }	| streakSelectors: { - [ ] task: 1 }
```

when a task has been completed
and the day resolves
```
bank: 0						| bank: 1
history: {}					| history: { - [ ] task: 1 }
streakSelectors: { - [x] task: 1 }	| streakSelectors: {}
```

when a task is in history
and it has been redeemed
```
bank: 1						| bank: 0
history: { - [ ] task: 1 }	| history: {}
streakSelectors: {}					| streakSelectors: { - [ ] task: 1 }
```

when a task is in history
and it has been redeemed
and there are not enough points in the bank
```
bank: 0						| bank: 0
history: { - [ ] task: 1 }	| history: {}
streakSelectors: {}					| streakSelectors: { - [ ] task: 0 }
```
*/
