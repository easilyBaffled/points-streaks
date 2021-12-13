import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web import {deserialize} from "./utils";
import { deserialize } from "./utils";

export const createDefaultPersistConfig = ( persistConfig ) => {
    const defaultPersistConfig = {
        debug:           true,
        deserialize,
        key:             "root",
        stateReconciler: hardSet,
        storage
    };

    return { ...defaultPersistConfig, ...persistConfig };
};
