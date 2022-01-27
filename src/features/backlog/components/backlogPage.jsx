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
