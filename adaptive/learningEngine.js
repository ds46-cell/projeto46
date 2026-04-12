function adjustConfidence(strategy, pastCases = []) {
  if (!strategy) return null;

  const adjustment = pastCases.length * 0.05;
  return Math.min(1, strategy.confidence + adjustment);
}

module.exports = {
  adjustConfidence
};
