import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./state";
import { Provider } from "react-redux";

console.tap = (v, ...rest) => (console.log(v, ...rest), v);

//https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/
/**
 * @typedef { import("./index").Task } Task
 * @typedef { import("./index").Bank } Bank
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskParts } TaskParts
 */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
