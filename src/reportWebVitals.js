let rows = [];

export const tableReport = ( reportEntry ) => {
    rows.push( reportEntry );
    if ( rows.length >= 5 ) console.table( rows );
};

const reportWebVitals = ( onPerfEntry ) => {
    if ( onPerfEntry && onPerfEntry instanceof Function ) {
        import( "web-vitals" ).then(
            ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS( onPerfEntry );
                getFID( onPerfEntry );
                getFCP( onPerfEntry );
                getLCP( onPerfEntry );
                getTTFB( onPerfEntry );
            }
        );
    }
};

export default reportWebVitals;
