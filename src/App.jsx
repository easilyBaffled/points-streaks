import "./App.css";
import { connect } from "react-redux";
import { selectors, actions } from "./state";
import clsx from "clsx";
import { StreakTask } from "./features/streak";
import {
    startReportingRuntimeErrors,
    stopReportingRuntimeErrors
} from "react-error-overlay";
import { useEffect } from "react";
import { getDaysState } from "./state/resolveDaySelector";
import { resolveDay } from "./state/actions";
import { BaseTask, CreateTaskInput } from "./features/task";

function shouldDebugUI() {
    let params = new URL(document.location).searchParams;
    return params.get("debug") === "ui";
}

function App({ streaks, tasks, lastRunDate, resolveDay }) {
    useEffect(() => {
        startReportingRuntimeErrors({ onError: () => {} });
        return () => stopReportingRuntimeErrors();
    }, []);

    return (
        <div className={clsx("App", { debug: shouldDebugUI() })}>
            <CreateTaskInput />
            <button onClick={() => resolveDay()}>Resolve {lastRunDate}</button>
            <div id="task-section">
                <div id="task-streaks">
                    {streaks.map((t) => (
                        <StreakTask key={t.id} {...t} />
                    ))}
                </div>
                <div id="tasks">
                    {tasks.map((t) => (
                        <BaseTask key={t.id} {...t} />
                    ))}
                </div>

                <pre>
                    <code>{JSON.stringify(tasks, null, 4)}</code>
                </pre>
            </div>
        </div>
    );
}

function prettyDateFormat(date) {
    var options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export default connect(
    (state) => ({
        state,
        lastRunDate: prettyDateFormat(state.app.date),
        streaks: selectors.streaks.selectAll(state),
        tasks: selectors.tasks.selectAll(state)
    }),
    (dispatch) => ({
        resolveDay: (state) => () => dispatch(resolveDay(getDaysState(state)))
    }),
    ({ state, ...stateProps }, { resolveDay, ...dispatchProps }, ownProps) => ({
        ...ownProps,
        ...dispatchProps,
        ...stateProps,
        resolveDay: resolveDay(state)
    })
)(App);
