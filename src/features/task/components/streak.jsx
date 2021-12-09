const dist = (streakIndex, currentIndex) =>
  Math.abs(streakIndex - currentIndex);

export const Streak = ({ streakCount, streakIndex }) => {
  const values = Array(5)
    .fill(0)
    .map((__, i) => i + streakCount)
    .concat("🍕");
  return (
    <div className="streak">
      {values.map((v, i) => (
        <span className={`point dist-${dist(streakIndex, i + 1)}`}>{v}</span>
      ))}
    </div>
  );
};
