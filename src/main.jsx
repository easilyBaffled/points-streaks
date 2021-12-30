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
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskBase } TaskBase
 * @typedef { import("./index").TaskParts } TaskParts
 * @typedef { import("./index").TaskStreak } TaskStreak
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
