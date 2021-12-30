import pThrottle from "p-throttle";
import { setDoc, getDoc } from "firebase/firestore";

/**
 *
 * @param {import("firebase/firestore").DocumentReference<unknown>} stateDoc
 * @param {number} interval
 * @return {{deleteItem: ThrottledFunction<[], Promise<void>>, getItem: (function(): *), setItem: ThrottledFunction<[], Promise<void>>}}
 */
export function createFBStorageAPI( stateDoc, interval = 2000 ) {
    const setFBValue = pThrottle({
        interval,
        limit: 1
    })( ( val ) => setDoc( stateDoc, val ).catch( console.error ) );

    return {
        deleteItem: setFBValue,
        getItem:    () =>
            getDoc( stateDoc )
                .then( ( doc ) => doc.data() )
                .catch( console.error ),
        setItem: setFBValue
    };
}

/**
 setDoc(stateDoc, {
		app: {
			date: 1639371600000
		},
		streakSelectors: {
			ids: [
				"email",
				"meditate",
				"teeth",
				"clean-5%",
				"quirk",
				"walk",
				"dev-tea",
				"luminosity",
				"🔊📚-(20)",
				"read(20)",
				"track-🥪",
				"track-🥤",
				"fiber-🧻",
				"#points"
			],
			entities: {
				email: {
					id: "email",
					status: "active",
					task: "email",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				meditate: {
					id: "meditate",
					status: "active",
					task: "meditate",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				teeth: {
					id: "teeth",
					status: "active",
					task: "teeth",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"clean-5%": {
					id: "clean-5%",
					status: "active",
					task: "clean 5%",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				quirk: {
					id: "quirk",
					status: "active",
					task: "quirk",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				walk: {
					id: "walk",
					status: "active",
					task: "walk",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"dev-tea": {
					id: "dev-tea",
					status: "active",
					task: "dev tea",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				luminosity: {
					id: "luminosity",
					status: "active",
					task: "luminosity",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"🔊📚-(20)": {
					id: "🔊📚-(20)",
					status: "active",
					task: "🔊📚 (20)",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"read(20)": {
					id: "read(20)",
					status: "active",
					task: "read(20)",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"track-🥪": {
					id: "track-🥪",
					status: "active",
					task: "track 🥪",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"track-🥤": {
					id: "track-🥤",
					status: "active",
					task: "track 🥤",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"fiber-🧻": {
					id: "fiber-🧻",
					status: "active",
					task: "fiber 🧻",
					streakIterations: 1,
					currentStreakIndex: 1
				},
				"#points": {
					id: "#points",
					status: "active",
					task: "#points",
					streakIterations: 1,
					currentStreakIndex: 1
				}
			}
		},
		bank: {
			points: 0,
			special: {
				pizza: 0
			}
		}
	})
        .then(console.log)
        .catch(console.error);
 */
