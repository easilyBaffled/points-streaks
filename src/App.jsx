import "./App.css";
import { connect } from "react-redux";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import "@reach/tabs/styles.css";
import clsx from "clsx";
import {
    startReportingRuntimeErrors,
    stopReportingRuntimeErrors
} from "react-error-overlay";
import { useEffect } from "react";
import { StreakTask } from "./features/streak";
import { selectors } from "./state";
import { getDaysState } from "./state/resolveDaySelector";
import { resolveDay } from "./state/actions";
import { BaseTask, CreateTaskInput, HistoryTask } from "./features/task";
import { Bank } from "@/features/bank";

function shouldDebugUI() {
    let params = new URL( document.location ).searchParams;
    return params.get( "debug" ) === "ui";
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
    useEffect( () => {
        startReportingRuntimeErrors({
            onError: () => {}
        });
        return () => stopReportingRuntimeErrors();
    }, []);

    return (
        <div className={clsx( "App", { debug: shouldDebugUI() })}>
            <CreateTaskInput />
            <button onClick={() => resolveDay()}>Resolve {lastRunDate}</button>
            <Bank />
            <div id="task-section">
                <div className="task-list">
                    {streaks.map( ( t ) => (
                        <StreakTask key={t.id} {...t} />
                    ) )}
                </div>
                <span>
                    <NavLink
                        to="active"
                        className={({ isActive }) =>
                            `task-list-link ${isActive ? "active" : ""}`
                        }
                    >
                        Active
                    </NavLink>
                    <NavLink
                        to="history"
                        className={({ isActive }) =>
                            `task-list-link ${isActive ? "active" : ""}`
                        }
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
                                {activeTasks.map( ( t ) => (
                                    <BaseTask key={t.id} {...t} />
                                ) )}
                            </div>
                        }
                    />
                    <Route
                        path={`/history`}
                        element={
                            <div className="task-list">
                                <h3>History</h3>
                                {historicalTasks.map( ( t ) => (
                                    <HistoryTask key={t.id} {...t} />
                                ) )}
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

function prettyDateFormat( date ) {
    var options = {
        day:     "numeric",
        month:   "long",
        weekday: "long"
    };

    return new Intl.DateTimeFormat( "en-US", options ).format( new Date( date ) );
}

export default connect(
    ( state ) => ({
        activeTasks:     selectors.tasks.getActiveTasks( state ),
        historicalTasks: selectors.tasks.getHistoricalTasks( state ),
        lastRunDate:     prettyDateFormat( state.app.date ),
        state,
        streaks:         selectors.streaks.selectAll( state ),
        tasks:           selectors.tasks.selectAll( state )
    }),
    ( dispatch ) => ({
        resolveDay: ( state ) => () => dispatch( resolveDay( getDaysState( state ) ) )
    }),
    ({ state, ...stateProps }, { resolveDay, ...dispatchProps }, ownProps ) => ({
        ...ownProps,
        ...dispatchProps,
        ...stateProps,
        resolveDay: resolveDay( state )
    })
)( App );
