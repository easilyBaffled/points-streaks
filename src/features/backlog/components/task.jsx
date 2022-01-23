import { connect } from "react-redux";
import { actions } from "../store";
import { Task } from "@/components";
import { promoteTask } from "@/state/actions/promoteTask";

export const _BacklogTask = ({ deleteTask, promoteTask, ...task }) => (
    <Task {...task}>
        <span>
            <button onClick={promoteTask}>promote</button>
            <button onClick={deleteTask}>x</button>
        </span>
    </Task>
);

export const BacklogTask = connect( null, ( dispatch, { id, ...task }) => ({
    deleteTask:  () => dispatch( actions.deleteTask( id ) ),
    promoteTask: () => dispatch( promoteTask({ id, task }) )
}) )( _BacklogTask );
