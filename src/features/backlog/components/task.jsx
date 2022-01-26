import { connect } from "react-redux";
import { actions } from "../store";
import { Name } from "@/components";
import { promoteTask } from "@/state/actions/promoteTask";

export const _BacklogTask = ({ deleteTask, promoteTask, ...task }) => (
    <div className="backlog-task" {...task}>
        <Name>{task.task}</Name>
        <button onClick={promoteTask}>promote</button>
        <button onClick={deleteTask}>x</button>
        <code>{task.tags.join( ", " )}</code>
    </div>
);

export const BacklogTask = connect( null, ( dispatch, { id, ...task }) => ({
    deleteTask:  () => dispatch( actions.deleteTask( id ) ),
    promoteTask: () => dispatch( promoteTask({ id, task }) )
}) )( _BacklogTask );
