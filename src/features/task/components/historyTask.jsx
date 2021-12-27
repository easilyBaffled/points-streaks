import { Task } from "../../../components";
import { actions, status as taskStatus } from "../store";
import { connect } from "react-redux";

export const _HistoryTask = ({ restoreTask, ...task }) => (
    <Task {...task}>
        <button onClick={restoreTask}>Restore</button>
    </Task>
);

export const HistoryTask = connect(
    (_, { status }) => ({
        isDone: status === taskStatus.done
    }),
    (dispatch, { id }) => ({
        toggleTaskStatus: () => {},
        restoreTask: () => dispatch(actions.restoreTask(id))
    })
)(_HistoryTask);
