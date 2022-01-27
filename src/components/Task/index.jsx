import React from "react";

import { DefaultName } from "./DefaultName";
import { DefaultValue } from "./DefaultValue";

export const Name = DefaultName;
export const Value = DefaultValue;

/**
 *
 * @param {JSX.Element[]} children
 * @param {TaskBase} task
 * @return {JSX.Element}
 *
 * @example
 * <Task {...task} name="default everything" />
 *
 * @example
 * <Task {...task} name="default name, altvalue with custom value">
 *     <AltValue>value</AltValue>
 *     </Task>
 *
 * @example
 * <Task {...task} name="default name, alt value with passed in value">
 *     <AltValue />
 * </Task>
 *
 * @example
 * <Task {...task} name="alt name and value, passed in values">
 *     <AltName />
 *     <AltValue />
 * </Task>
 *
 * @example
 * <Task {...task} name="alt name and value, passed in values, extra component">
 *     <h1>😁</h1>
 *     <AltName />
 *     <AltValue />
 * </Task>
 */
export const Task = ({ children, toggleTaskStatus, deleteTask, ...task }) => {
    let elArr = React.Children.toArray( children );

    if ( !elArr.length ) elArr = [ DefaultName, DefaultValue ];
    else if ( elArr.length === 1 ) elArr.unshift( DefaultName ); // assume that I am going to use a custom Value more often than a custom name

    return (
        <div
            className="task border-b border-gray-300 p-3"
            onClick={toggleTaskStatus}
        >
            {elArr.map( ( elOrCmp, i ) => {
                const key = `${task.id}_${
                    elOrCmp?.type?.name ?? elOrCmp.type
                }_${i}`;

                return React.isValidElement( elOrCmp )
                    ? React.cloneElement( elOrCmp, {
                        ...task,
                        key
                    })
                    : React.createElement( elOrCmp, {
                        ...task,
                        key
                    });
            })}
        </div>
    );
};
