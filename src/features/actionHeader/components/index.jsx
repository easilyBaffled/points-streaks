import { connect } from "react-redux";
import { Bank } from "@/features/bank";
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

function _ActionHeader({ lastRunDate, resolveDay }) {
    return (
        <header className="action-header">
            <button onClick={resolveDay}>Resolve {lastRunDate}</button>
            <Bank />
            <details className="dev-tools-section">
                <summary>
                    <h3>Developer Tools</h3>
                </summary>
                <span className="dev-tools-controls">
                    <button onClick={window.points.syncFromHistory}>
                        Pull from History
                    </button>
                    <button onClick={window.points.syncToHistory}>
                        Push to History
                    </button>
                </span>
            </details>
        </header>
    );
}

export const ActionHeader = connect(
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
)( _ActionHeader );
