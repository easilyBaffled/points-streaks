import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//https://goulet.dev/posts/how-to-write-ts-interfaces-in-jsdoc/
/**
 * @typedef { import("./index").Task } Task
 * @typedef { import("./index").Bank } Bank
 * @typedef { import("./index").Task } TaskDict
 * @typedef { import("./index").TaskParts } TaskParts
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
