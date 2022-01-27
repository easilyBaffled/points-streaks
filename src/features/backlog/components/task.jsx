import { connect } from "react-redux";
import { TrashIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { actions } from "../store";
import { Name } from "@/components";
import { promoteTask } from "@/state/actions/promoteTask";

export const _BacklogTask = ({ deleteTask, promoteTask, ...task }) => (
    <div className="backlog-task border-b border-gray-300 p-3" {...task}>
        <Name>{task.task}</Name>
        <ThumbUpIcon
            aria-hidden="true"
            className="h-8 w-8"
            onClick={promoteTask}
        />
        <TrashIcon
            className="h-8 w-8"
            aria-hidden="true"
            onClick={deleteTask}
        />
        <code>{task.tags.join( ", " )}</code>
    </div>
);

export const BacklogTask = connect( null, ( dispatch, { id, ...task }) => ({
    deleteTask:  () => dispatch( actions.deleteTask( id ) ),
    promoteTask: () => dispatch( promoteTask({ id, task }) )
}) )( _BacklogTask );
