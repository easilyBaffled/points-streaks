import { actions } from "../store";
import { connect } from "react-redux";

const processTaskCreationForm = (action) => (e) => {
    e.preventDefault();
    // console.log(e.target.elements.tasks.value.split("\n"));
    action(
        console.tap(e.target.elements.tasks.value.split("\n"), "from the input")
    );
};

export const _CreateTaskInput = ({ createTask, createTasks }) => (
    <form onSubmit={processTaskCreationForm(createTasks)}>
        {/*<input name="task" />*/}
        <textarea name="tasks" />
        <button type="submit">Submit</button>
    </form>
);

export const CreateTaskInput = connect(null, (dispatch) => ({
    createTask: (taskName) => dispatch(actions.createTask(taskName)),
    createTasks: (taskNames) => dispatch(actions.createTasks(taskNames))
}))(_CreateTaskInput);
