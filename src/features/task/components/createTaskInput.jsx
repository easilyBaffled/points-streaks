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
            className="new-task-input focus:ring-indigo-500 focus:border-indigo-500 block pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
            onSubmit={processTaskCreationForm( createTasks )}
        />
    </EasyForm>
);

export const CreateTaskInput = connect( null, ( dispatch ) => ({
    createTask:  ( taskName ) => dispatch( actions.createTask( taskName ) ),
    createTasks: ( taskNames ) => dispatch( actions.createTasks( taskNames ) )
}) )( _CreateTaskInput );
