import pThrottle from "p-throttle";
import { setDoc } from "firebase/firestore"

export const createFBStorageAPI = ( stateDocReference, interval = 2000 ) => {
    const setFBValue = pThrottle({
        interval,
        limit: 1
    })( ( val ) =>
		setDoc(stateDocReference, val )
	);

    return {
        deleteItem: setFBValue,
        getItem:    () => stateDocReference.data(),
        setItem:    setFBValue
    };
};
