import { Task } from "../../../components";
import { actions, status as taskStatus } from "../store";
import { connect } from "react-redux";

export const _BaseTask = (task) => <Task {...task} />;

export const BaseTask = connect(
    (_, { status }) => ({
        isDone: status === taskStatus.done
    }),
    (dispatch, { id }) => ({
        toggleTaskStatus: () => dispatch(actions.toggleTaskStatus(id))
    })
)(_BaseTask);
