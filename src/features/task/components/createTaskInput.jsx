import { connect } from "react-redux";
import { actions } from "../store";

const processTaskCreationForm = ( action ) => ( e ) => {
    e.preventDefault();
    action( e.target.elements.tasks.value.split( "\n" ) );
};

export const _CreateTaskInput = ({ createTask, createTasks }) => (
    <form onSubmit={processTaskCreationForm( createTasks )}>
        <textarea name="tasks" />
        <button type="submit">Submit</button>
    </form>
);

export const CreateTaskInput = connect( null, ( dispatch ) => ({
    createTask:  ( taskName ) => dispatch( actions.createTask( taskName ) ),
    createTasks: ( taskNames ) => dispatch( actions.createTasks( taskNames ) )
}) )( _CreateTaskInput );
