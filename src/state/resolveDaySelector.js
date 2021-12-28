import { selectors } from "../features/streak";

export function getToday( date = new Date() ) {
    return new Date( date ).setHours( 0, 0, 0, 0 );
}

export function getDaysState( state ) {
    if ( state.app.date === getToday() )
        return { app: {}, bank: {}, streaks: false, tasks: false };
    return {
        app:     {
            date: getToday()
        },
        bank:    selectors.getDaysPoints( state ),
        streaks: true,
        tasks:   true
    };
}
