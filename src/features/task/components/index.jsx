import { Streak } from "./streak";
import { actions, status as taskStatus } from "../store";
import { connect } from "react-redux";
import clsx from "clsx";
export const _Task = ({
    id,
    isDone,
    task,
    streakIterations,
    currentStreakIndex,
    toggleTaskStatus
}) => (
    <div className="task" onClick={toggleTaskStatus(id)}>
        <input type="checkbox" checked={isDone} readOnly />
        <h3 className={clsx({ done: isDone })}>{task}</h3>
        <Streak
            streakCount={streakIterations}
            streakIndex={currentStreakIndex}
        />
    </div>
);

export const Task = connect(
    (_, { status }) => ({
        isDone: status === taskStatus.done
    }),
    (dispatch) => ({
        toggleTaskStatus: (id) => () => dispatch(actions.toggleTaskStatus(id))
    })
)(_Task);
