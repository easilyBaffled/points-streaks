import "./App.css";
import { connect } from "react-redux";
import { Route, Routes, NavLink } from "react-router-dom";
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
import { AddRewardInput, RewardsList } from "@/features/rewards";

function shouldDebugUI() {
    let params = new URL( document.location ).searchParams;
    return params.get( "debug" ) === "ui";
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
                    {[ "active", "history", "rewards" ].map( ( route ) => (
                        <NavLink
                            key={route}
                            to={route}
                            className={({ isActive }) =>
                                `task-list-link ${isActive ? "active" : ""}`
                            }
                        >
                            {route.toUpperCase()}
                        </NavLink>
                    ) )}
                </span>
                <Routes>
                    <Route
                        path={`/active`}
                        element={
                            <div className="task-list">
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
                                {console
                                    .tap( Object.entries( historicalTasks ) )
                                    .map( ([ date, taskList ]) => (
                                        <>
                                            <h1>
                                                {new Date(
                                                    Number( date )
                                                ).toDateString()}
                                            </h1>
                                            {taskList.map( ( t ) => (
                                                <HistoryTask
                                                    key={t.id}
                                                    {...t}
                                                />
                                            ) )}
                                        </>
                                    ) )}
                            </div>
                        }
                    />
                    <Route
                        path={`/rewards`}
                        element={
                            <div className="task-list">
                                <AddRewardInput />
                                <RewardsList />
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
        historicalTasks: selectors.tasks.getHistoryListGroupedByDate( state ),
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
