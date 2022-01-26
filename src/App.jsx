import "./App.css";
import "@reach/tabs/styles.css";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { StreakTask } from "./features/streak";
import { selectors } from "./state";
import { HistoryTask } from "./features/task";
import { AddRewardInput, RewardsList } from "@/features/rewards";
import { TaskPage } from "@/features/task";
import { BacklogPage } from "@/features/backlog";
import {
    ContentHeader,
    Logo,
    Main,
    MobileMenuButton,
    NavFullView,
    NavMobileView,
    UserProfileDropdown
} from "@/features/mainPage";

const EasyTaskList = ({ tasks }) => (
    <div className="task-list">
        {tasks.map( ( t ) => (
            <StreakTask key={t.id} {...t} />
        ) )}
    </div>
);

const user = {
    email:    "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Tom Cook"
};
const navigation = [
    { current: true, href: "#", name: "Dashboard" },
    { current: false, href: "#", name: "Team" },
    { current: false, href: "#", name: "Projects" },
    { current: false, href: "#", name: "Calendar" },
    { current: false, href: "#", name: "Reports" }
];
const userNavigation = [
    { href: "#", name: "Your Profile" },
    { href: "#", name: "Settings" },
    { href: "#", name: "Sign out" }
];

function classNames( ...classes ) {
    return classes.filter( Boolean ).join( " " );
}

const routes = [ "streaks", "active", "history", "rewards", "backlog" ];

const App = ({ streaks, historicalTasks }) => (
    <div className="min-h-screen">
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-10">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Logo />
                                <NavFullView
                                    routes={routes}
                                    navigation={navigation}
                                    classNames={classNames}
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {/* Profile dropdown */}
                                    <UserProfileDropdown
                                        user={user}
                                        userNavigation={userNavigation}
                                        classNames={classNames}
                                    />
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <MobileMenuButton open={open} />
                            </div>
                        </div>
                    </div>
                    <NavMobileView
                        classNames={classNames}
                        navigation={navigation}
                        routes={routes}
                        user={user}
                        userNavigation={userNavigation}
                    />
                </>
            )}
        </Disclosure>

        <ContentHeader />
        <Main>
            <div className="inline-block w-full p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Routes>
                    <Route path={`/active`} element={<TaskPage />} />
                    <Route
                        path={`/streaks`}
                        element={<EasyTaskList tasks={streaks} />}
                    />
                    <Route path={`/backlog`} element={<BacklogPage />} />
                    <Route
                        path={`/history`}
                        element={
                            <div className="task-list">
                                {Object.entries( historicalTasks ).map(
                                    ([ date, taskList ]) => (
                                        <Fragment key="date">
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
                                        </Fragment>
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
            </div>
        </Main>
    </div>
);

export default connect( ( state ) => ({
    historicalTasks: selectors.tasks.getHistoryListGroupedByDate( state ),
    state,
    streaks:         selectors.streaks.selectAll( state ),
    tasks:           selectors.tasks.selectAll( state )
}) )( App );
