import { Streak } from "./streak";
import { Task } from "../../../components";
import { actions, status as taskStatus } from "../store";
import { connect } from "react-redux";

export const _StreakTask = (task) => (
    <Task {...task}>
        <Streak />
    </Task>
);

export const StreakTask = connect(
    (_, { status }) => ({
        isDone: status === taskStatus.done
    }),
    (dispatch) => ({
        toggleTaskStatus: (id) => () => dispatch(actions.toggleTaskStatus(id))
    })
)(_StreakTask);
