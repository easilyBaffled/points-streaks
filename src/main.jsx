import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./state";
import App from "./App";
import reportWebVitals, { tableReport } from "./reportWebVitals";

export const Redux = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
);

console.tap = ( v, ...rest ) => (
    console.log(
        // "%c" + new Error().stack.split("\n"),
        // "background: tomato;color: #eee;padding: 5px;border-radius: 10px;margin: 5px",
        v,
        ...rest
    ),
    v
);
// https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/
/**
 * @typedef { import("./index").Bank } Bank
 * @typedef { import("./index").Reward } Reward
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskBase } TaskBase
 * @typedef { import("./index").TaskParts } TaskParts
 * @typedef { import("./index").TaskStreak } TaskStreak
 * @typedef { import("./index").RewardParts } RewardParts
 */

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Redux>
                <App />
            </Redux>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById( "root" )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals( tableReport );
window.points = {};
window.points.amount = ([ str ]) => {
    const amount = str
        .split( "\n" )
        .filter( ( v ) => v && !v.startsWith( "##" ) && !v.startsWith( "**" ) ).length;
    const reduction = Math.ceil( amount * 0.05 );
    const reduced = amount - reduction;

    var today = new Date(),
        dd = String( today.getDate() ).padStart( 2, "0" ),
        mm = String( today.getMonth() + 1 ).padStart( 2, "0" ); // January is 0!
    copy( `${mm}/${dd} at ${amount}. Target ${reduced}( ${reduction} ) ` );
    console.log( `${mm}/${dd} at ${amount}. Target ${reduced}( ${reduction} ) ` );
};

window.points.removeTags = ([ str ]) =>
    str
        .split( "\n" )
        .map(
            ( s ) =>
                s.match( /(?<tags>#\w+ )+(?<task>[^:]+):\s+(?<meta>.*)/ )
                    ?.groups ?? {}
        )
        .map( ({ task, meta }) => `${task}: ${meta}` )
        .join( "\n" );

window.points.timebox = ( str, useNow ) => {
    let now = new Date();
    let d = new Date();
    let endOfDay = ( d.setHours( 17 ), d.setMinutes( 0 ), d.setSeconds( 0 ), d );
    let timeInDay = Math.floor( ( endOfDay - now ) / 60000 );

    str.replace( /(^.+:\s*)/gm, "" )
        .split( "\n" )
        .filter( Boolean )
        .reduce(
            ( timeRemaining, t, i ) => {
                if ( Number.isNaN( parseInt( t ) ) )
                    throw `nothing at ${t} - index ${i}`;
                return timeRemaining - eval( t ); // us eval so I can use numbers as well as calculations like (15+15)
            },
            useNow ? timeInDay : 440
        );
};

window.points.timebox.defaultList = `
- Walk: 45
- read: 25
- breakfast: 20
- lunch: 30
- stretch: 30
- morning coffee: 30
- How many open PRs: 15
- How are stories moving on the board: 15
- PRs: 120`;
