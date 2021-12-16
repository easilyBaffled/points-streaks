/**
 *
 * @param {string} jsonString
 * @return {Object}
 */
export const deserializePersist = ( jsonString ) =>
    Object.entries( JSON.parse( jsonString ) ).reduce(
        /**
         *
         * @param {Object} acc
         * @param {string} k
         * @param {string} v
         * @return {Object}
         */
        ( acc, [ k, v ]) => ({
            ...acc,
            [ k ]: JSON.parse( v )
        }),
        {}
    );
