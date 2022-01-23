import { connect } from "react-redux";
import { selectors } from "../store";
import { CreateTaskInput } from "./createTaskInput";
import { BaseTask } from "./task";

export const _TaskPage = ({ activeTasks }) => (
    <div className="task-list">
        <CreateTaskInput />
        {activeTasks.map( ( t ) => (
            <BaseTask key={t.id} {...t} />
        ) )}
    </div>
);
export const TaskPage = connect( ( state ) => ({
    activeTasks: selectors.getActiveTasks( state )
}) )( _TaskPage );
