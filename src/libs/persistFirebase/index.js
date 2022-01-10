import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createDefaultPersistConfig } from "./configuredPersist";
import { rq } from "./utils";
import { deserializePersist } from "./deserializePersist";
import { activeDoc, getDoc } from "@/libs/firestore";

export default createDefaultPersistConfig;

export const createFireBaseRealTimePersistConfig = ( throttleTime = 100 ) => {
    const dbStorage = activeDoc;

    const mergedStorage = {
        deleteItem: ( ...args ) =>
            storage.deleteItem( ...args ).then( ( res ) => {
                dbStorage.deleteItem();
                return res;
            }),
        getItem: dbStorage.getItem,
        setItem: ( key, value ) =>
            storage
                .setItem( key, value )
                .then( () => dbStorage.setItem( deserializePersist( value ) ) )
    };

    return createDefaultPersistConfig({ storage: mergedStorage });
};
