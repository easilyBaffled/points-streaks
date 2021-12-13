export const not = ( func ) => ( ...args ) => !func( ...args );
// from https://github.com/jonschlinkert/is-primitive
export const isPrimitive = ( val ) =>
    typeof val === "object" ? val === null : typeof val !== "function";

export function isJson( str ) {
    try {
        JSON.parse( str );
    } catch ( e ) {
        return false;
    }
    return isNaN( str ); // TODO: isNaN is not clear for the intention
}

// https://www.npmjs.com/package/kind-of#benchmarks
