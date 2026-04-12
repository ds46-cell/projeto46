// backend/continuityEngine.js

function evaluateContinuity(history, currentDecision) {
  if (!history.length) {
    return {
      continuity: "NEW_CYCLE",
      consistencyScore: 1
    };
  }

  const similar = history.filter(
    h =>
      h.country === currentDecision.country &&
      h.status === currentDecision.status
  );

  const score = Math.min(1, similar.length / history.length);

  return {
    continuity: similar.length > 0 ? "CONSISTENT" : "DIVERGENT",
    consistencyScore: Number(score.toFixed(2))
  };
}

module.exports = {
  evaluateContinuity
};
