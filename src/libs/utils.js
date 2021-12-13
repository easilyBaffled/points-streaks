import throttle from "lodash/throttle";
import { isJson } from "./predicates.js";

export const required = ( paramName = "param" ) => () => {
    throw new Error(
        `${Array.isArray( paramName ) ? paramName[ 0 ] : paramName} is required`
    );
};

export const rq = required;

export const throttlePromise = ( reqFn, time = 2000 ) => {
    let p = null;
    return throttle( ( ...args ) => {
        if ( !p ) {
            p = reqFn( ...args ).then( () => {
                p = null;
            });
        }
        return p;
    }, time );
};
export const deserialize = ( mightBeString ) =>
    isJson( mightBeString ) ? JSON.parse( mightBeString ) : mightBeString;
