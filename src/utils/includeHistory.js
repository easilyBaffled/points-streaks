import { dynamicChange } from "@/features/task/index.js";

function doesPayloadHaveId( state, action ) {
    const maybeId = action?.payload?.id ?? action.payload;
    return typeof maybeId === "string" && maybeId in state.entities
        ? maybeId
        : null;
}

const updateEntityHistory = dynamicChange( ( s, action ) => {
    if ( !s.history ) s.history = [];

    s.history.push({
        action,
        date: Date.now()
    });
});
const entitiesWithHistory = ( reducer ) => ( state, action ) => {
    const newState = reducer( state, action );
    const payloadDoesHaveId = doesPayloadHaveId( newState, action );
    return payloadDoesHaveId ? updateEntityHistory( newState, action ) : newState;
};

export function includeHistory( reducers ) {
    return Object.fromEntries(
        Object.entries( reducers ).map( ([ name, reducer ]) => {
            const reducerWithInternalHistory = entitiesWithHistory( reducer );

            return [ name, reducerWithInternalHistory ];
        })
    );
}
