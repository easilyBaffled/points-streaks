import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createDefaultPersistConfig } from "./configuredPersist";
import { initRealtimeFirebaseDB } from "./firebaseConnection";
import { rq } from "./utils";
import { deserializePersist } from "./deserializePersist";

export default createDefaultPersistConfig;

export const createFireBaseRealTimePersistConfig = (
    firebaseConfig = rq`firebaseConfig`,
    throttleTime = 100
) => {
    const dbStorage = initRealtimeFirebaseDB( firebaseConfig, throttleTime );

    const mergedStorage = {
        deleteItem: ( ...args ) =>
            storage.deleteItem( ...args ).then( ( res ) => {
                dbStorage.deleteItem();
                return res;
            }),
        getItem: dbStorage.getItem,
        setItem: ( key, value ) =>
            storage.setItem( key, value ).then( () =>
                dbStorage.setItem( deserializePersist( value ) )
            )
    };

    return createDefaultPersistConfig({ storage: mergedStorage });
};
