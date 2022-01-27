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
        <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
            name="task"
            onSubmit={ignoreIfEmpty( createTask )}
        />
        <textarea
            name="tasks"
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
            onSubmit={ignoreIfEmpty( processTaskCreationForm( createTasks ) )}
        />
    </EasyForm>
);

export const CreateTaskInput = connect( null, ( dispatch ) => ({
    createTask:  ( taskName ) => dispatch( actions.createTask( taskName ) ),
    createTasks: ( taskNames ) => dispatch( actions.createTasks( taskNames ) )
}) )( _CreateTaskInput );
