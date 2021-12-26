import "./App.css";
import { connect } from "react-redux";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import "@reach/tabs/styles.css";
import { selectors } from "./state";
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

function Test() {
    return <h1>test</h1>;
}

function App({
    streaks,
    tasks,
    lastRunDate,
    resolveDay,
    historicalTasks,
    activeTasks
}) {
    useEffect(() => {
        startReportingRuntimeErrors({ onError: () => {} });
        return () => stopReportingRuntimeErrors();
    }, []);

    return (
        <div className={clsx("App", { debug: shouldDebugUI() })}>
            <CreateTaskInput />
            <button onClick={() => resolveDay()}>Resolve {lastRunDate}</button>
            <div id="task-section">
                <div className="task-list">
                    {streaks.map((t) => (
                        <StreakTask key={t.id} {...t} />
                    ))}
                </div>
                <span>
                    <NavLink
                        to="active"
                        activeClassName="active"
                        className="task-list-link"
                    >
                        Active
                    </NavLink>
                    <NavLink
                        to="history"
                        activeClassName="active"
                        className="task-list-link"
                    >
                        History
                    </NavLink>
                </span>
                <Routes>
                    <Route
                        path={`/active`}
                        element={
                            <div className="task-list">
                                <h3>Active</h3>
                                {activeTasks.map((t) => (
                                    <BaseTask key={t.id} {...t} />
                                ))}
                            </div>
                        }
                    />
                    <Route
                        path={`/history`}
                        element={
                            <div className="task-list">
                                <h3>History</h3>
                                {historicalTasks.map((t) => (
                                    <BaseTask key={t.id} {...t} />
                                ))}
                            </div>
                        }
                    />
                </Routes>
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
        tasks: selectors.tasks.selectAll(state),
        activeTasks: selectors.tasks.getActiveTasks(state),
        historicalTasks: selectors.tasks.getHistoricalTasks(state)
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
