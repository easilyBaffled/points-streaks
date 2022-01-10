// New Firebase Lib
import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/config/firebase";
import { createFBStorageAPI } from "@/libs/firestore/createFBStorageAPI";

let db = null;

export function init() {
    initializeApp( firebaseConfig );
    db = getFirestore();
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
