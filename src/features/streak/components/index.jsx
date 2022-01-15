import { connect } from "react-redux";
import { actions, status as taskStatus } from "../store";
import { Streak } from "./streak";
import { Task } from "@/components";

export const _StreakTask = ( task ) => (
    <Task {...task}>
        <Streak />
    </Task>
);

export const StreakTask = connect(
    ( _, { status }) => ({
        isDone: status === taskStatus.done
    }),
    ( dispatch, { id }) => ({
        toggleTaskStatus: () => dispatch( actions.toggleTaskStatus( id ) )
    })
)( _StreakTask );
