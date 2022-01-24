import { connect } from "react-redux";
import { resolveDay } from "@/state/actions";
import { getDaysState } from "@/state/resolveDaySelector";

function prettyDateFormat( date ) {
    var options = {
        day:     "numeric",
        month:   "long",
        weekday: "long"
    };

    return new Intl.DateTimeFormat( "en-US", options ).format( new Date( date ) );
}

function _ResolveDayButton({ lastRunDate, resolveDay }) {
    return (
        <button
            type="button"
            onClick={resolveDay}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Resolve {lastRunDate}
        </button>
    );
}

export const ResolveDayButton = connect(
    ( state ) => ({
        lastRunDate: prettyDateFormat( state.app.date ),
        state
    }),
    ( dispatch ) => ({
        resolveDay: ( state ) => () => dispatch( resolveDay( getDaysState( state ) ) )
    }),
    ({ state, ...stateProps }, { resolveDay, ...dispatchProps }, ownProps ) => ({
        ...ownProps,
        ...dispatchProps,
        ...stateProps,
        resolveDay: resolveDay( state )
    })
)( _ResolveDayButton );
