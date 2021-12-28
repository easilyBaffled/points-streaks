export const listToEntity = ( items ) => {
    const entities = items.reduce( ( acc, t ) => {
        acc[ t.id.replace( / /g, "-" ) ] = t;
        return acc;
    }, {});

    return {
        entities,
        ids: Object.keys( entities )
    };
};
export const _staticChange =
    ( adapter ) =>
        ( changes ) =>
            ( state, { payload }) =>
                adapter.updateOne( state, {
                    changes,
                    id: payload
                });

export const _dynamicChange =
    ( adapter ) =>
        ( updater ) =>
            ( state, { payload }) =>
                adapter.updateOne( state, {
                    changes: updater( state.entities[ payload ]),
                    id:      payload
                });

export const getDaysAgo = ( amount = 1 ) =>
    Date.now() - 1000 * 60 * 60 * 24 * amount;
