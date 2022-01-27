// New Firebase Lib
import { initializeApp } from "firebase/app";
import {
    doc,
    getFirestore,
    enableIndexedDbPersistence
} from "firebase/firestore";
import firebaseConfig from "@/config/firebase";
import { createFBStorageAPI } from "@/libs/firestore/createFBStorageAPI";

let db = null;

export function init() {
    initializeApp( firebaseConfig );
    db = getFirestore();
    enableIndexedDbPersistence( db ).catch( ( err ) => {
        console.log( err );
        if ( err.code == "failed-precondition" ) {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if ( err.code == "unimplemented" ) {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
}

init( firebaseConfig );

export function getDoc( path, ...pathSegments ) {
    let docRef = doc( db, path, ...pathSegments );
    const docAPI = createFBStorageAPI( docRef, 100 );
    return {
        docRef,
        ...docAPI
    };
}

export const activeDoc = getDoc( `state_${import.meta.env.MODE}`, "state" );
