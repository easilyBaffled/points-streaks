import "./App.css";
import { connect } from "react-redux";
import { selectors } from "./state";
import clsx from "clsx";
import { Task } from "./features/task";
import {
  startReportingRuntimeErrors,
  stopReportingRuntimeErrors,
} from "react-error-overlay";
import { useEffect } from "react";

function shouldDebugUI() {
  let params = new URL(document.location).searchParams;
  return params.get("debug") === "ui";
}

function App({ tasks }) {
  useEffect(() => {
    startReportingRuntimeErrors({ onError: () => {} });
    return () => stopReportingRuntimeErrors();
  }, []);

  return (
    <div className={clsx("App", { debug: shouldDebugUI() })}>
      <div id="task-streaks">
        {tasks.map((t) => (
          <Task key={t.id} {...t} />
        ))}
      </div>
      <pre>
        <code>{JSON.stringify(tasks, null, 4)}</code>
      </pre>
    </div>
  );
}

export default connect((state) => ({
  tasks: selectors.tasks.selectAll(state),
}))(App);
