import { connect } from "react-redux";
import { actions, status as taskStatus } from "../store";
import { Task } from "@/components";
import { DefaultValue } from "@/components/Task/DefaultValue";

export const _BaseTask = ({ deleteTask, ...task }) => (
    <Task {...task}>
        <span>
            <DefaultValue {...task} />
            <button onClick={deleteTask}>x</button>
        </span>
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
