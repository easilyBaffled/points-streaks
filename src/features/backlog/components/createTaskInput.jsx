import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { actions } from "../store";
import { EasyForm } from "@/components";

const ignoreIfEmpty = ( action ) => ( value ) => {
    if ( !isEmpty( value ) ) action( value );
};

const processTaskCreationForm = ( action ) => ( value ) => {
    action( value.split( "\n" ) );
};

export const _CreateTaskInput = ({ createTasks, createTask }) => (
    <EasyForm showSubmit>
        <input name="task" onSubmit={ignoreIfEmpty( createTask )} />
        <textarea
            name="tasks"
            className="new-task-input"
            onSubmit={ignoreIfEmpty( processTaskCreationForm( createTasks ) )}
        />
    </EasyForm>
);

export const CreateTaskInput = connect( null, ( dispatch ) => ({
    createTask:  ( taskName ) => dispatch( actions.createTask( taskName ) ),
    createTasks: ( taskNames ) => dispatch( actions.createTasks( taskNames ) )
}) )( _CreateTaskInput );
