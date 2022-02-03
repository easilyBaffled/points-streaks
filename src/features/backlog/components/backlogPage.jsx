import { connect } from "react-redux";
import { useState } from "react";
import { filter, parse } from "liqe";
import { selectors } from "../store";
import { CreateTaskInput } from "./createTaskInput";

import { BacklogTask } from "./task";

const filterList = ( list, filterText ) => {
    try {
        return filterText ? filter( parse( filterText ), list ) : list;
    } catch ( error ) {
        console.error( error );

        return list;
    }
};
export const _BacklogPage = ({ backlogTasks }) => {
    const [ filterText, setFilter ] = useState();

    return (
        <div className="task-list gap-3">
            <CreateTaskInput />
            <input
                placeholder="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 sm:text-sm border-2 border-gray-300 rounded-md"
                onChange={( e ) => setFilter( e.target.value )}
            />
            <a
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                download="backlog.txt"
                href={
                    "data:text/plain;charset=utf-8," +
                    encodeURIComponent(
                        backlogTasks.map( ( task ) => task.fullTask ).join( "\n" )
                    )
                }
            >
                Download List as Text
            </a>
            <code>{backlogTasks.length}</code>
            {backlogTasks.length && (
                <>
                    <code>{Object.keys( backlogTasks[ 0 ]).join( ", " )}</code>
                    {filterList( backlogTasks, filterText ).map( ( t ) => (
                        <BacklogTask key={t.id} {...t} />
                    ) )}
                </>
            )}
        </div>
    );
};
export const BacklogPage = connect( ( state ) => ({
    backlogTasks: selectors.getSortedBacklog( state )
}) )( _BacklogPage );
