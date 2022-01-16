import "./App.css";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "@reach/tabs/styles.css";
import clsx from "clsx";
import { StreakTask } from "./features/streak";
import { selectors } from "./state";
import { BaseTask, CreateTaskInput, HistoryTask } from "./features/task";
import { AddRewardInput, RewardsList } from "@/features/rewards";
import { NavTabs } from "@/components/navTabs/NavTabs";
import { ActionHeader } from "@/features/actionHeader";

function shouldDebugUI() {
    let params = new URL( document.location ).searchParams;
    return params.get( "debug" ) === "ui";
}

const EasyTaskList = ({ tasks }) => (
    <div className="task-list">
        {tasks.map( ( t ) => (
            <StreakTask key={t.id} {...t} />
        ) )}
    </div>
);
const App = ({ streaks, historicalTasks, activeTasks }) => (
    <div className={clsx( "App", { debug: shouldDebugUI() })}>
        <ActionHeader />
        <main className="content">
            <EasyTaskList tasks={streaks} />
            <span className="task-list">
                <NavTabs routes={[ "active", "history", "rewards" ]} />
                <Routes>
                    <Route
                        path={`/active`}
                        element={
                            <div className="task-list">
                                <CreateTaskInput />
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
                                {Object.entries( historicalTasks ).map(
                                    ([ date, taskList ]) => (
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
                                    )
                                )}
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
            </span>
        </main>
    </div>
);

export default connect( ( state ) => ({
    activeTasks:     selectors.tasks.getActiveTasks( state ),
    historicalTasks: selectors.tasks.getHistoryListGroupedByDate( state ),
    state,
    streaks:         selectors.streaks.selectAll( state ),
    tasks:           selectors.tasks.selectAll( state )
}) )( App );
