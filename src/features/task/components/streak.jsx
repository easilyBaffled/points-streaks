const dist = (streakIndex, currentIndex) =>
    Math.abs(streakIndex - currentIndex);

export const Streak = ({ streakIterations, currentStreakIndex }) => {
    const values = Array(5)
        .fill(0)
        .map((__, i) => i + streakIterations)
        .concat("🍕");
    return (
        <div className="streak">
            {values.map((v, i) => (
                <span
                    key={v}
                    className={`point dist-${dist(currentStreakIndex, i + 1)}`}
                >
                    {v}
                </span>
            ))}
        </div>
    );
};
