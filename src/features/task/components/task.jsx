import { connect } from "react-redux";
import { TrashIcon } from "@heroicons/react/outline";
import { actions, status as taskStatus } from "../store";
import { Task } from "@/components";

export const _BaseTask = ({ deleteTask, ...task }) => (
    <Task {...task}>
        <TrashIcon
            className="h-6 w-6"
            aria-hidden="true"
            onClick={deleteTask}
        />
    </Task>
);

export const BaseTask = connect(
    ( _, { status }) => ({
        isDone: status === taskStatus.done
    }),
    ( dispatch, { id }) => ({
        deleteTask: ( e ) => {
            e.stopPropagation();
            return dispatch( actions.deleteTask( id ) );
        },
        toggleTaskStatus: () => dispatch( actions.toggleTaskStatus( id ) )
    })
)( _BaseTask );
