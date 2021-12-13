import pThrottle from "p-throttle";
import { setDoc } from "firebase/firestore";

/**
 *
 * @param {Promise<import("firebase/firestore").DocumentSnapshot>} stateDoc
 * @param {number} interval
 * @return {{deleteItem: ThrottledFunction<[], Promise<void>>, getItem: (function(): *), setItem: ThrottledFunction<[], Promise<void>>}}
 */
export function createFBStorageAPI(stateDoc, interval = 2000) {
    stateDoc.then(console.log);
    const setFBValue = pThrottle({
        interval,
        limit: 1
    })((val) => stateDoc.then((doc) => setDoc(doc, val)));

    return {
        deleteItem: setFBValue,
        getItem: () => stateDoc.then((doc) => doc.data()).then(console.tap),
        setItem: setFBValue
    };
}
