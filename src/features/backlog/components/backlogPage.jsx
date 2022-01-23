import { connect } from "react-redux";
import { selectors } from "../store";
import { CreateTaskInput } from "./createTaskInput";
import { BacklogTask } from "./task";

export const _BacklogPage = ({ backlogTasks }) => (
    <div className="task-list">
        <CreateTaskInput />
        {backlogTasks.map( ( t ) => (
            <BacklogTask key={t.id} {...t} />
        ) )}
    </div>
);
export const BacklogPage = connect( ( state ) => ({
    backlogTasks: selectors.getBacklog( state )
}) )( _BacklogPage );
