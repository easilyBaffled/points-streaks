import { connect } from "react-redux";
import { actions } from "../store";
import { EasyForm } from "@/components";

const processTaskCreationForm = ( action ) => ( value ) => {
    action( value.split( "\n" ) );
};

export const _CreateTaskInput = ({ createTasks }) => (
    <EasyForm showSubmit>
        <textarea
            name="tasks"
            className="new-task-input"
            onSubmit={processTaskCreationForm( createTasks )}
        />
    </EasyForm>
);

export const CreateTaskInput = connect( null, ( dispatch ) => ({
    createTask:  ( taskName ) => dispatch( actions.createTask( taskName ) ),
    createTasks: ( taskNames ) => dispatch( actions.createTasks( taskNames ) )
}) )( _CreateTaskInput );
