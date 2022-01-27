import { createSelector } from "@reduxjs/toolkit";
import { backlogAdapter } from "./entityAdapter.js";
import { ratings } from "./ranking.js";

export const selectors = backlogAdapter.getSelectors(
    ( state ) => state?.backlog ?? state
);

const getCategory = ( task ) => task.replaceAll( "#", "" ).split( " " )[ 0 ];

const getCategoryRank = ( task ) => ratings.category.indexOf( getCategory( task ) );

selectors.getBacklog = selectors.selectAll;
selectors.getSortedBacklog = createSelector( selectors.getBacklog, ( backlog ) => {
    console.tap( backlog );
    return backlog.sort( ( a, b ) => {
        const ratingDiff = b.rating - a.rating;
        return (
            ratingDiff ||
            getCategoryRank( b.tagsString ) - getCategoryRank( a.tagsString )
        );
    });
});
