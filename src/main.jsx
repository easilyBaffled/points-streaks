import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store, { persistor } from "./state";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Redux = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
);

console.tap = (v, ...rest) => (console.log(v, ...rest), v);

//https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/
/**
 * @typedef { import("./index").TaskStreak } TaskStreak
 * @typedef { import("./index").Bank } Bank
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskParts } TaskParts
 */

ReactDOM.render(
    <React.StrictMode>
        <Redux>
            <App />
        </Redux>
    </React.StrictMode>,
    document.getElementById("root")
);
