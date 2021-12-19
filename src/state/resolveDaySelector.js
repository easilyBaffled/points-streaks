import { selectors } from "../features/streak";

export function getToday(date = new Date()) {
    return new Date(date).setHours(0, 0, 0, 0);
}

export function getDaysState(state) {
    if (state.app.date === getToday())
        return { bank: {}, streaks: false, app: {} };
    return {
        bank: selectors.getDaysPoints(state),
        tasks: true,
        app: {
            date: getToday()
        }
    };
}
