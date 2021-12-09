import "./App.css";
import { connect } from "react-redux";
import { selectors, actions } from "./state";
import clsx from "clsx";
import { Task } from "./features/task";
import {
  startReportingRuntimeErrors,
  stopReportingRuntimeErrors,
} from "react-error-overlay";
import { useEffect } from "react";
import { getDaysState } from "./state/resolveDaySelector";

function shouldDebugUI() {
  let params = new URL(document.location).searchParams;
  return params.get("debug") === "ui";
}

function App({ tasks, lastRunDate, resolveDay }) {
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
      <button onClick={() => resolveDay()}>Resolve {lastRunDate}</button>
      <pre>
        <code>{JSON.stringify(tasks, null, 4)}</code>
      </pre>
    </div>
  );
}

function prettyDateFormat(date) {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export default connect(
  (state) => ({
    state,
    lastRunDate: prettyDateFormat(state.app.date),
    tasks: selectors.tasks.selectAll(state),
  }),
  (dispatch) => ({
    resolveDay: (state) => () =>
      dispatch(actions.resolveDay(getDaysState(state))),
  }),
  ({ state, ...stateProps }, { resolveDay, ...dispatchProps }, ownProps) => ({
    ...ownProps,
    ...dispatchProps,
    ...stateProps,
    resolveDay: resolveDay(state),
  })
)(App);
