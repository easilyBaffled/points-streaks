How can I keep infrastructure the same across both projects?

## Bulletproof

	- [x] Copy over plop
	- [ ] set proper repo
	- [ ] add MSW from [react-query-auth-demo - CodeSandbox](https://codesandbox.io/s/react-query-auth-demo-fvvvt?file=/src/index.tsx) to get login working
	- [ ] evaluate Cypress vs Jest
	- [x] use [plopjs](https://plopjs.com/) with [bulletproof example](https://github.com/alan2207/bulletproof-react/blob/ff8308ffe773782937e96a1883185eccebfd931e/generators/component/index.js) to generate features
	- [x] use [plopjs](https://plopjs.com/) with [bulletproof example](https://github.com/alan2207/bulletproof-react/blob/ff8308ffe773782937e96a1883185eccebfd931e/generators/component/index.js) to generate slice
	- [x] use [plopjs](https://plopjs.com/) with [bulletproof example](https://github.com/alan2207/bulletproof-react/blob/ff8308ffe773782937e96a1883185eccebfd931e/generators/component/index.js) to generate component
	- [ ] port over my changes from Mapware
	- [ ] port over my changes from Points

## Mapware

	- [ ] #fetch configure endpoint
	- [ ] #fetch create the project specific fetch function for codegen
	- [ ] #fetch integrate graphql generation
	- [ ] create top level routing work / login
	- [ ] move all routing to `features`
	- [ ] pull in google analytics (and leave a place for our better stats)
	- [ ] breadcrumbs nav
	- [ ] share link

## Infrastructure

[GitHub - tailwindlabs/tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms)
for each directory/file- write up what is different and the tasks i need to move it over to my project

* `/.github`
* `/.husky`
* `/cypress`
	- [ ] integration vs e2e - `"integrationFolder": "cypress/e2e"`, what's `"fileServerFolder": "dist",`
	- [ ] cypress specific eslint.js
	- [ ] what does `testing-library` provide
* `/public`
* `.postcssrc.json`
* `.stylelintrc.json`
* `index.html`
* `package.json` - mostly scripts and `lint-staged`
* `tailwind.config.js`
* `vercel.json`
* `vite.config.ts`

- [ ] add [GitHub - tailwindlabs/tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms)
- [ ] how to add lighthouse measurements to github
- [ ] create `constants` and `utils`
- [ ] move all tests to their proper `/__test__`
- [ ] create doc explaining `feature`, `routing`, and `index.js`s
- [ ] use direnv or something to make proper `.env` in accordance with what vite expects

## UX

- [ ] Add Tailwind
- [ ] Create Composed Tailwind Classes
- [ ] pull in basic tailwind for a better style
- [ ] Pick Tailwind Theme
- [ ] Pick Component Library ([Presentation | Material Tailwind by Creative Tim](https://material-tailwind.com)
  ?) [Tailwind UI - Official Tailwind CSS Components](https://tailwindui.com/#product-application-ui)
- [ ] does tailwind have vertical rhythm
- [ ] celebration on click

## Performance

- [ ] add [web-vitals](https://github.com/GoogleChrome/web-vitals)
	- [ ] https://create-react-app.dev/docs/measuring-performance/
	- [ ] what do these numbers mean?
- [ ] use https://github.com/wtchnm/Vitamin for Lighthouse
- [ ] how to identify critical css
- [ ] poke julian about that whole HTTP/2 file serving

## Points

### Backlog

- [ ] create slice
- [ ] view list
	- [ ] remove item
	- [ ] edit item
	- [ ] add single item
	- [ ] promote item
	- [ ] add bulk
	- [ ] use [liqe](https://github.com/gajus/liqe) to sort/filter

- [ ] add redux history
- [ ] quick state editor https://www.npmjs.com/package/jsoneditor-react
- [ ] add daily tasks
- [ ] login https://firebase.google.com/docs/auth/web/firebaseui
	- [ ] points how to code up deadlines
- [ ] why does removing something from the list lock scrolling
- [ ] clear input after submit
- [ ] redux history
- [ ] wire in redux dev tools

## CICD

- [ ] raise coverage limit
- [ ] report coverage
- [ ] do I want to add snyk to the github
  workflow https://docs.snyk.io/features/integrations/ci-cd-integrations/github-actions-integration
- [ ] have a `console.log` that outputs the last commit id so I can know if I'm really looking at the last change
- [ ] how to convert my CI/CD to apply for all branches
- [ ] get push notifications from github if pipeline fails
- [ ] add eslint to pr req
- [ ] use  `build:prod` for deployments
- [ ] how are [React-Query](https://github.com/tannerlinsley/react-query/pull/3006)'s PRs setup?

## Security

- [ ] [can I set limits for firestore](https://firebase.google.com/docs/firestore/quotas)
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
	- [ ] how does [bulletproof-react](https://github.com/alan2207/bulletproof-react/tree/master/src) secure it's api
	- [ ] [environment variables - How do I use an env file with GitHub Actions? - Stack Overflow](https://stackoverflow.com/questions/60176044/how-do-i-use-an-env-file-with-github-actions)
- [ ] [env based keys](https://firebase.google.com/docs/projects/api-keys#test-vs-prod-keys)

## Confidence

- [ ] Get Unit tests working
- [ ] How to intercept Firestore    [prescottprue/cypress-firebase](https://github.com/prescottprue/cypress-firebase)
- [ ] Easy Error Boundries
- [ ] Port Reacts Error Layer
- [ ] Add Sentry
- [ ] [Chaos Frontend Toolkit - Tools to break your web apps and find ways to improve them | Product Hunt](https://www.producthunt.com/posts/chaos-frontend-toolkit)

## V2

- [ ] define types as GQL Scheme
- [ ] How to mutate
- [ ] Create BE
- [ ] Convert to React Native
- [ ] create composable Task reducer

## Reading/Planning

- [x] [GitHub - alan2207/bulletproof-react: 🛡️ ⚛️ A simple, scalable, and powerful architecture for building production ready React applications.](https://github.com/alan2207/bulletproof-react)
- [ ] [GitHub - wtchnm/Vitamin: Opinionated Vite starter template.](https://github.com/wtchnm/Vitamin)
- [ ] [An Introduction to GraphQL | Tania Rascia](https://www.taniarascia.com/introduction-to-graphql/)
- [ ] [How and Why You Should Store React UI State in the URL](https://betterprogramming.pub/how-and-why-you-should-store-react-ui-state-in-the-url-f2013a204cb2)
- [ ] [Tao of React - Software Design, Architecture & Best Practices | Alex Kondov - Software Engineer](https://alexkondov.com/tao-of-react/?ck_subscriber_id=478727104)
- [ ] [React Architecture: How to Structure and Organize a React Application | Tania Rascia](https://www.taniarascia.com/react-architecture-directory-structure/)
- [ ] [React folder structure for enterprise level applications](https://engineering.udacity.com/react-folder-structure-for-enterprise-level-applications-f8384eff162b)
- [ ] 📝 my goal for personal points is to do away with due and bear

## Toys

- [ ]
  try [copilot-docs/gettingstarted.md at main · github/copilot-docs · GitHub](https://github.com/github/copilot-docs/blob/main/docs/jetbrains/gettingstarted.md)
- [ ] give [Use WebWorkers in Vite with comlink!](https://github.com/mathe42/vite-plugin-comlink) a try when I need a
  web worker
- [ ] [Introduction to Remix](https://flaviocopes.com/remix/)

---

- [x] walk
  through https://www.twilio.com/blog/2018/06/installable-web-apps-practical-introduction-progressive-web-apps.html
- [x] create prod & dev data (with a "sync" button)
- [x] sort history by done date
- [x] Deploy
	- [x] convert all firebase config to env
	- [x] use https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FeasilyBaffled%2Fpoints-streaks for first deploy
	- [x] how to tie vercel's new with github actions
	- [x] might be good https://aaronfrancis.com/2021/the-perfect-vercel-github-actions-deployment-pipeline
- [x] grids (or flex wrap) for points

> The longer you wait to add infra like eslint, coverage, responsive, the harder it is to add
> So when coding features hits a lul I should take the opportunity to add cov

- [x] reduce [vite logging](https://vitejs.dev/config/)
- [x] **Could Not Complete:** update reporting to only show broken tests
- [x] get tests to pass
- [x] **Cypress Doesn't have an option:** how to have cy `watch` *and* notify locally
- [x] [Cy GitHub Actions](https://docs.cypress.io/guides/continuous-integration/github-actions#Cypress-GitHub-Action)
- [x] CICD
	- [x] why is my [pipeline](https://github.com/easilyBaffled/points-streaks/runs/4680123332?check_suite_focus=true)
	  breaking
	- [x] the pipeline should install and/or cache build
	- [x] lint, test, and so on
	- [x] if all things pass properly deploy anew
- [x] create prod data
- [x] create `PROD` switch for build
- [x] eslint
	- [x] add eslint
	- [x] fix eslint issues
	- [x] add the `no-import` rule from bulletproof
- [x] unit tests
	- [x] collect coverage
	- [x] error on coverage
- [x] [add `@` path alias](https://javascript.plainenglish.io/how-to-set-up-path-resolving-in-vite-ad284e0d9eae)
	- [x] add `jsconfig.json`
	- [x] update vite.config.js
	- [x] run tests to make sure everything still works
- [x] why did i lose state

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
- [x] fix eslint issues
- [x] https://rebassjs.org/ or Tailwind
- [x] keep a history of actions on each task
- [x] transfer streaks to app
- [x] display bank

> So I know that I am doing things very wrong writing everything to the Firestore everytime I make a change to state.
> And there are certainly a number of things I could do to improve the situation but honestly right now I just need this thing to move along.
> So all improvements I can think of will go to Ideal Cloud/DB, but for now the job is GET IT DONE.

- [x] FireStore Persist
	- [x] locate my persist code in the previous points
	- [x] port over persist
	- [x] read the new docs
		- [x] [collection](https://firebase.google.com/docs/reference/js/firestore_.md#collection)> Gets a
		  CollectionReference Not too much I can do with it, so I need to use getDoc(s)
		- [x] [getDoc](https://firebase.google.com/docs/reference/js/firestore_.md#getdoc)> Reads the document referred
		  to by this DocumentReference.

> `getDocs` lets you specify a query and get an array, but if I'm only playing by myself then I don't need to query. But really I care about `DocumentReference`
> A DocumentSnapshot contains data read from a document in your Firestore database. The data can be extracted with .data() or .get() to get a specific field.

- [x] [setDoc](https://firebase.google.com/docs/reference/js/firestore_.md#setdoc)> Writes to the document referred to
  by this DocumentReference. If the document does not yet exist, it will be created.

> If you provide `merge` or `mergeFields`, the provided data can be merged into an existing document. Perhaps I can in the future send just the chunk of state that has been updated, rather than sending the whole thing

- [x] set up persisting an object
- [x] get object persist working

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

	* [x]

add [firebase connections](https://console.firebase.google.com/u/0/project/points-streaks/firestore/data/~2Fstate~2FmBCVz1POhx56wpHNrvjW)

- [x] add emulation https://firebase.google.com/docs/emulator-suite
  & https://firebase.google.com/docs/emulator-suite/connect_and_prototype?database=Firestore
- [x] [Firestore QuickStart](https://firebase.google.com/docs/firestore/quickstart#web-version-9)
- [x] [rect-redux-firebase + redux-persist](https://github.com/prescottprue/react-redux-firebase/blob/master/docs/integrations/redux-persist.md)

* [x]

read [React and Firebase without Redux](https://prescottprue.medium.com/react-and-firebase-without-redux-5c1b2b6a6ba1)

- [x] just add basic
  read [Use with Redux-Persist](https://redux-toolkit.js.org/usage/usage-guide#use-with-react-redux-firebase)
- [x] wire up firebase/supabase to
  persistence [react-redux-firebase](https://redux-toolkit.js.org/usage/usage-guide#use-with-react-redux-firebase)
- [x] RTK-Query?
- [x] Persist v2
	- [x] how to do persistence with state
	  migration [?](https://www.freecodecamp.org/news/how-to-use-redux-persist-when-migrating-your-states-a5dee16b5ead/)

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
- [x] create *actual* initialState

> I don't really want to get too bogged down in the infrastructure, like I would with Bulletproof, this is really to get the thing off the ground. because nothing is more valuable than just using the damn thing. So this is, "just enough to use it" which includes:

- [x] create repo
- [x] pick cloud place to work for now
- [x] use `vite` to create a project
- [x] add `readme.md`
- [x] add `.gitignore`
- [x] add redux toolkit requirements
- [x] add Cypress for unit testing
- [x] add the fun script to update deps if PRs Pass
- [x] https://docs.cypress.io/guides/continuous-integration/github-actions?utm_source=Test+Runner&utm_medium=CI+Prompt+1&utm_campaign=GitHub&utm_content=Automatic
- [x] add .eslint
- [x] configure prettier-eslint
