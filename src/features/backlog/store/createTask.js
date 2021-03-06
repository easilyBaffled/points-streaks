import { nanoid } from "@reduxjs/toolkit";
import { rateTask } from "./ranking.js";

const status = {
    active: "active",
    done:   "done"
};

/**
 *
 * @param {string} str
 * @param {number} index
 * @return {[string, string]}
 */
const splitAt = ( str, index ) => [ str.slice( 0, index ), str.slice( index ) ];

/**
 *
 * @param {string} str
 * @return {number}
 */
const findRegexIndex = ( str ) => / ([^#])/.exec( str )?.index ?? 0;

/**
 *
 * @param {string} task
 * @return {[string, string]}
 */
const splitTagsAndTask = ( task ) => splitAt( task, findRegexIndex( task ) );

/**
 *
 * @param {string|TaskParts} task
 * @param {TaskParts} optional
 * @return Task
 */
export function createTask( task, optional = {}) {
    if ( typeof task === "object" ) {
        optional = task;
        task = task.task;
    }
    const [ _tags, _task ] = splitTagsAndTask( task );
    const tags = _tags.split( " " );
    return {
        history:    [],
        id:         nanoid(),
        status:     status.active,
        task:       _task,
        value:      1,
        ...optional,
        created_at: Date.now(),
        fullTask:   task,
        ranking:    rateTask( task ),
        tags,
        tagsString: _tags
    };
}
