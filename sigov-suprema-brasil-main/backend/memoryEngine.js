// backend/memoryEngine.js

function analyzeMemory(events, newEvent) {
  if (!events.length) {
    return {
      patternDetected: false,
      recurrenceLevel: "NONE",
      historicalImpact: 0
    };
  }

  const similarEvents = events.filter(e =>
    e.tipo === newEvent.tipo &&
    e.nivelRisco >= newEvent.nivelRisco - 1
  );

  const frequency = similarEvents.length;

  let recurrenceLevel = "LOW";
  if (frequency >= 5) recurrenceLevel = "EXTREME";
  else if (frequency >= 3) recurrenceLevel = "HIGH";
  else if (frequency >= 1) recurrenceLevel = "MEDIUM";

  const avgScore =
    similarEvents.reduce((sum, e) => sum + (e.score || 0), 0) /
    (frequency || 1);

  return {
    patternDetected: frequency > 0,
    recurrenceLevel,
    historicalImpact: Math.round(avgScore)
  };
}

module.exports = {
  analyzeMemory
};
