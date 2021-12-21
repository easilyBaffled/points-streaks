// template test

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
import { createNextState } from "@reduxjs/toolkit";
import { resolveDay } from "../../state/actions";
import { flow } from "lodash";
const modifyEntity = _modifyEntity(testState);

const baseState = {
    // The unique IDs of each item. Must be strings or numbers
    ids: [],
    // A lookup table mapping entity IDs to the corresponding entity objects
    entities: {},
    completed: {}
};

const nextState = (fn) => createNextState(baseState, fn);

describe("Task CRUD", () => {
    it("should create a new task", () => {
        const actual = reducer(
            initialState,
            actions.createTask({ task: a, id: a })
        );
        const expected = nextState((s) => {
            s.ids.push(a);
            s.entities[a] = createTask(a, { id: a });
        });

        expect(actual).to.eqls(expected);
    });
    it("should mark a task as done", () => {
        const actual = reducer(testState, actions.markTaskDone(a));
        const expected = modifyEntity(a, (e) => (e.status = status.done));

        expect(actual).to.eqls(expected);
    });
    it("should mark a task as active", () => {
        const actual = reducer(testState, actions.markTaskDone(a));
        const expected = modifyEntity(a, (e) => (e.status = status.done));

        expect(actual).to.eqls(expected);
    });
    it("should move a done task to history", () => {
        const nextState = reducer(testState, actions.markTaskDone(a));

        const actual = reducer(nextState, resolveDay({ tasks: true }));
        const expected = createNextState(nextState, (s) => {
            s.history[a] = true;
        });

        expect(actual).to.eqls(expected);
    });
    it("should move a task out of history and mark as active", () => {
        const actual = flow(
            (s) => reducer(s, actions.markTaskDone(a)),
            (s) => reducer(s, resolveDay({ tasks: true })),
            (s) => reducer(s, actions.restoreTask(a))
        )(testState);

        const expected = createNextState(actual, (s) => {
            s.entities[a].status = status.active;
            s.history[a] = false;
        });

        expect(actual).to.eqls(expected);
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
