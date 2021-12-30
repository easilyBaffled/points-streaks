<details>
	<summary>
		<strong>Stream Of Thought: Infrastructure</strong>
	</summary>

> The longer you wait to add infra like eslint, coverage, responsive, the harder it is to add
> So when coding features hits a lul I should take the opportunity to add cov

- [ ] eslint
	- [x] add eslint
	- [ ] fix eslint issues
	- [ ] add eslint to pr req
	- [ ] add the `no-import` rule from bulletproof
- [ ] unit tests
	- [ ] add passing req to PRs
	- [x] add coverage
	- [ ] add cov limit to PRs
	- [ ] add deploy cov report to PRs
- [ ] [add `@` path alias](https://javascript.plainenglish.io/how-to-set-up-path-resolving-in-vite-ad284e0d9eae)
	- [x] add `jsconfig.json`
	- [x] update vite.config.js
	- [ ] run tests to make sure everything still works
- [ ] add [web-vitals](https://github.com/GoogleChrome/web-vitals)
	- [ ] https://create-react-app.dev/docs/measuring-performance/
	- [x] https://github.com/alan2207/bulletproof-react/blob/341919f8b03d1054202a049d24ec6f20271a7019/src/reportWebVitals.ts
	- [ ] what do these numbers mean?
- [ ] get push notifications from github if pipeline fails

</details>
<details>
	<summary>
		<strong>Stream Of Thought: Standard Tasks</strong>
	</summary>

> So I have finally hit a major refactoring point. I want to add standard tasks, ones that I can create, complete, move to history, and move back if necessary.
> I am going to have to recover from shooting myself in the foot first, because I named all the streak stuff "task" so the first thing is to refactor that to be just streaks
> And in looking forward I am going to have to be a little careful because I am also going to want daily tasks, that are like teh standard task but it doesn't get moved to history.
> I can think about how that gets implemented later, but it's more that I need to keep things open, so I can easily adapt it later.

- [x] how can I read that I am in a test env to disable firebase?
- [x] create cypress watch so I can make my changes and get live updates
- [x] refactor `/task` to be `/streaks`
- [x] move `Task` component to a shared `/component` location
- [x] update `Task` component so that it can be composed with other type of tasks
- [x] create exports necessary for tests
- [x] create tests for task CRUD
- [x] create entities for "tasks" and "history",
- [x] add create task input
- [x] add task list to UI
- [x] add history list
- [x] add tabbed view for active/history
- [x] add restore task button
- [x] add handler to bank to move task's value
- [ ] fix eslint issues
- [ ] [can I set limits for firestore](https://firebase.google.com/docs/firestore/quotas)
- [ ] https://firebase.google.com/docs/auth/web/firebaseui
- [ ] https://rebassjs.org/ or Tailwind
- [ ] keep a history of actions on each task
- [ ] how can I compose specialized tasks like streaks using the baseTask reducer so that I'm not duplicating work like
  internal history?
- [ ] transfer streaks to app
- [ ] add tailwind + material
- [ ] make mobile friendly

</details>

<details>
	<summary>
		<strong>Stream Of Thought: Firestore Persist</strong>
	</summary>

> So I know that I am doing things very wrong writing everything to the Firestore everytime I make a change to state.
> And there are certainly a number of things I could do to improve the situation but honestly right now I just need this thing to move along.
> So all improvements I can think of will go to Ideal Cloud/DB, but for now the job is GET IT DONE.

- [x] FireStore Persist
	- [x] locate my persist code in the previous points
	- [x] port over persist
	- [x] read the new docs
		- [x] [collection](https://firebase.google.com/docs/reference/js/firestore_.md#collection)
		  > Gets a CollectionReference Not too much I can do with it, so I need to use getDoc(s)
		- [x] [getDoc](https://firebase.google.com/docs/reference/js/firestore_.md#getdoc)
		  > Reads the document referred to by this DocumentReference.
		  `getDocs` lets you specify a query and get an array, but if I'm only playing by myself then I don't need to query. But really I care about `DocumentReference`
		  > A DocumentSnapshot contains data read from a document in your Firestore database. The data can be extracted with .data() or .get(<field>) to get a specific field.
		- [x] [setDoc](https://firebase.google.com/docs/reference/js/firestore_.md#setdoc)
		  > Writes to the document referred to by this DocumentReference. If the document does not yet exist, it will be created.
		  > If you provide `merge` or `mergeFields`, the provided data can be merged into an existing document. Perhaps I can in the future send just the chunk of state that has been updated, rather than sending the whole thing
	- [x] set up persisting an object
	- [x] get object persist working

</details>

<details>
	<summary>
		<strong>Ideal Cloud/DB</strong>
	</summary>

> OK I have finally hit the wall that I feel I always run into and then drop
> Cloud Storage. At savepoint I need a database.
> I wish to high hell that I could just save my entire redux store on every change but that doesn't seem to be possible.
> My wish would be something like [immer-to-firestore](https://github.com/tdawes/immer-to-firestore)
> where I could perform JS actions on an object and that would be translated to firestore/supabase/what-ever.
> It's possible my answer still lies with GraphQL, but that's going to require a lot of reading and learning.
> I may end up splitting my time between learning that and forward progress on streaks. So I am going to need to do some thinking
> For the time being I think I need to do some quick and dirty work on streaks to keep it going,
> namely use my `redux-persist` hack where I write the whole string of my state to firebase through `redux-persist`.
> I presume it's "gross" but it also let's me maintian my forward progress on this app, while I figure out what I am looking for

> my number one concern is not having to work in two projects, so no client/server situation.
> Even if they both live in the same project, I really don't want to have to maintain a front and backend

- [ ] Firebase Security
	- [ ] auth based security
	- [ ] [javascript - Is it safe to expose Firebase apiKey to the public? - Stack Overflow](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public)
		- [x] how do [Firebase](https://firebase.google.com/docs/projects/api-keys) say to secure my keys
		- [ ] [How to secure your Firebase project even when your API key is publicly available | by Devesu | Medium](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843)
		- [x] [How to keep your Firebase project safe and secure from everyone - DEV Community](https://dev.to/obnoxiousnerd/how-to-keep-your-firebase-project-safe-and-secure-from-everyone-1p2i)
		- [ ] [Hiding API Keys with Environment Variables](https://www.youtube.com/watch?v=17UVejOw3zA)
		- [ ] does [dotenv](https://github.com/motdotla/dotenv) secure anything or just make it easier
		- [ ] how does [GitHub - prescottprue/firething](https://github.com/prescottprue/firething) secure env
		- [ ] [Dotenv Action · Actions · GitHub Marketplace · GitHub](https://github.com/marketplace/actions/dotenv-action)
		- [ ] how does [bulletproof-react](https://github.com/alan2207/bulletproof-react/tree/master/src) secure it's
		  api
		- [ ] [environment variables - How do I use an env file with GitHub Actions? - Stack Overflow](https://stackoverflow.com/questions/60176044/how-do-i-use-an-env-file-with-github-actions)
	- [ ] [env based keys](https://firebase.google.com/docs/projects/api-keys#test-vs-prod-keys)
- [ ] Magic Wand DB
	- [ ] draft what the "magic wand" option would be
	- [ ] why don't I think Apollo is that option
	- [ ] draft what I think existing tools I could use for that would be
	- [ ] draft how I could abstract all of my work with RTK to that
	- [ ] could [redux-deep-diff](https://www.npmjs.com/package/redux-deep-diff) help?
	- [ ] could [redux-undo](https://github.com/omnidan/redux-undo) help
	- [ ] could [microdiff](https://github.com/AsyncBanana/microdiff?ck_subscriber_id=478727104) help
	- [ ] can I get the patch notes from immer to use
	  with [immer-to-firestore](https://github.com/tdawes/immer-to-firestore)
- [ ] Apollo Odyssey
	- [ ] [LIFT-OFF I: BASICS](https://odyssey.apollographql.com/lift-off-part1/feature-overview-and-setup)
	- [ ] [Lift-off II: Resolvers](https://odyssey.apollographql.com/lift-off-part2)
	- [ ] [LIFT-OFF III: ARGUMENTS](https://odyssey.apollographql.com/lift-off-part3)
	- [ ] [LIFT-OFF IV: MUTATIONS](https://odyssey.apollographql.com/lift-off-part4)

</details>

<details>
	<summary>
		<strong>Train of Thought: UI</strong>
	</summary>

> ok so that last "Train of Thought" probably went on for long enoug, so this is where the new one starts.
> Once again I am going to try and stay away from all of that good foundational scaffolding that I'm working on in bulletproof
> in exchange for speed of getting things done here
> I can feel my motivation waning a bit so I really need to be good about laying out small chunks and reminding myself
> how much faster this will make my mornings, and just think once streaks are done I can start with regular tasking and automating the backlog

- [x] create Task Feature
- [x] move task store to feature
- [x] create component for Task
- [x] port over component for streak [sandbox](https://codesandbox.io/s/epic-lalande-87qkj?file=/src/App.js)
- [x] set my defaults for layout
- [x] use [Custom CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
- [x] add the React Error Overlay
- [x] wire up toggle tasks
- [x] wire up resolve day
- [x] why does resolve day break? (I was doing `{ payload: { bank } }` destructuring on `{}`, and there's no good
  messaging for destructuring errors)
- [x] persist state
	- [x] localStorage
	- [x]
	  add [firebase connections](https://console.firebase.google.com/u/0/project/points-streaks/firestore/data/~2Fstate~2FmBCVz1POhx56wpHNrvjW)
		- [x] add emulation https://firebase.google.com/docs/emulator-suite
		  & https://firebase.google.com/docs/emulator-suite/connect_and_prototype?database=Firestore
		- [x] [Firestore QuickStart](https://firebase.google.com/docs/firestore/quickstart#web-version-9)
	- [x] [rect-redux-firebase + redux-persist](https://github.com/prescottprue/react-redux-firebase/blob/master/docs/integrations/redux-persist.md)
	- [x]
	  read [React and Firebase without Redux](https://prescottprue.medium.com/react-and-firebase-without-redux-5c1b2b6a6ba1)
	- [x] just add basic
	  read [Use with Redux-Persist](https://redux-toolkit.js.org/usage/usage-guide#use-with-react-redux-firebase)
	- [x] wire up firebase/supabase to
	  persistence [react-redux-firebase](https://redux-toolkit.js.org/usage/usage-guide#use-with-react-redux-firebase)
	- [x] RTK-Query?
- [ ] Deploy
	- [ ] convert all firebase config to env
	- [ ] use https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FeasilyBaffled%2Fpoints-streaks for first deploy
	- [ ] how to tie vercel's new with github actions
- [ ] Persist v2
	- [ ] how to do persistence with state
	  migration [?](https://www.freecodecamp.org/news/how-to-use-redux-persist-when-migrating-your-states-a5dee16b5ead/)
- [ ] Testing
	- [ ] [Testing React + Firebase Apps With Cypress](https://prescottprue.medium.com/testing-react-firebase-apps-with-cypress-7d7a64d155de)
	- [ ] [cypress-firebase](https://github.com/prescottprue/cypress-firebase)
	- [x] [Set up the Local Emulator Suite](https://firebase.google.com/docs/rules/emulator-setup)
	- [ ] [Unit Testing Firebase Testing Quickstarts](https://firebaseopensource.com/projects/firebase/quickstart-testing/)

- [ ] Styling
	- [ ] [try styling](https://tailwindcss.com/blog/tailwindcss-v3)

</details>


<details>
	<summary>
		<strong>Train of Thought: State</strong>
	</summary>

> I am trying to build to `resolveDay` and to that end the next piece that I think I need is `Bank`
> So I am working on that. **BUT** I still don't have a way to solve the global state issue, so I am not creating a `bankSlice`
> Rather I am defining the object that would be used in `createSlice` that way if I chose I can work it into a `globalSlice` with the other pieces.

- [x] how do i define selectors
- [x] define a selector that produces the point value of a pizza and amount of pizza
- [x] should I use selectors in my unit tests?
- [x] bank unit tests
- [x] create redux slice sandbox for
  experiments [redux/toolkit sandbox](https://codesandbox.io/s/beautiful-merkle-tw0lo?file=/src/store.js)
- [x] https://redux.js.org/understanding/history-and-design/middleware#the-final-approach
- [x] https://redux-toolkit.js.org/api/getDefaultMiddleware
- [x] can I tell when state has or will change in the middleware?
- [x] how does the default middleware work?
- [x] what if I only return the updated action
- [x] sketch out `resolveDay` as a middleware that will serve as the director reading state, and dictating to each
  reducer what it will need to do
- [x] create tests based on the scenarios assuming a full redux store
- [x] create store based on the `sandbox`
- [x] create selectors for resolve day
- [x] # resolveDaySelectors get value of completed tasks for the bank
- [x] # resolveDaySelectors create action detailer
- [x] test `resolveDay` with the bank and `getDaysPoints`
- [x] load `initialState` for tests
- [x] create _actual_ initialState

</details>

<details>
	<summary>
		<strong>Create The Project</strong>
	</summary>

> I don't really want to get too bogged down in the infrastructure, like I would with Bulletproof, this is really to get the thing off the ground. because nothing is more valuable than just using the damn thing. So this is, "just enough to use it" which includes:

- [x] create repo
- [x] pick cloud place to work for now
- [x] use `vite` to create a project
- [x] add `readme.md`
- [ ] add `.gitignore`
- [x] add redux toolkit requirements
- [x] add Cypress for unit testing
- [x] add the fun script to update deps if PRs Pass
- [ ] https://docs.cypress.io/guides/continuous-integration/github-actions?utm_source=Test+Runner&utm_medium=CI+Prompt+1&utm_campaign=GitHub&utm_content=Automatic
- [x] add .eslint
- [x] configure prettier-eslint
- [ ] try https://github.com/github/copilot-docs/blob/main/docs/jetbrains/gettingstarted.md

</details>
---
/**

* bank: 0
*
	- [x] task: [ 1, 2, 3, 4, 5, 🍕]
*
* resolve
*
* bank: 1
*
	- [ ] task: [ x, 2, 3, 4, 5, 🍕]
*
* when a day resolves if a task was marked complete then the tasks streak is incremented and the task is marked active
  and points are added to the bank
  */ // I need a way to check if a task was complete // I need a way to increment the streak // I need a way to mark a
  task as active // I need a way to add a certain amount of points to the bank

/**

* bank: 0
*
	- [x] task: [ x, 2, 3, 4, 5 🍕]
*
* resolve
*
* bank: 2
*
	- [ ] task: [ x, x, 3, 4, 5 🍕]
*
* when a day resolves if a task was marked complete and the task had an active streak then the tasks streak is
  incremented and the task is marked active and points are added to the bank
  */

/**

* bank: 0
*
	- [x] task: [ x, x, x, x, x 🍕]
*
* resolve
*
* bank: 0 | 🍕
*
	- [ ] task: [ 2, 3, 4, 5, 6 🍕]
*
* when a day resolves if a task was marked complete and the task was at the last entry in the iteration then the active
  streak is reset and a special value is added to the bank and the entire streaks value is incremented
  */

/**

* bank: 0
*
	- [ ] task: [ 1, 2, 3, 4, 5, 🍕]
*
* resolve
*
* bank: 0
*
	- [ ] task: [ 1, 2, 3, 4, 5, 🍕]
*
* When the day resolves
* if no tasks were marked complete then no tasks are toggled and no points are added to the bank
  */

/**

* bank: 0
*
	- [ ] task: [ x, 3, 4, 5, 6 🍕]
*
* resolve
*
* bank: 0
*
	- [ ] task: [ 1, 2, 3, 4, 5 🍕]
*
* When the day resolves if no tasks were marked complete and a task had an active streak then the active streak is reset
  **/
