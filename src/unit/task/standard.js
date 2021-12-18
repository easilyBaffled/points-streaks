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
