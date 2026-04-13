// backend/riskEngine.js

/**
 * Classifica o risco principal
 */
function classifyRisk(nivelRisco) {
  if (nivelRisco >= 9) return "CRITICAL";
  if (nivelRisco >= 7) return "HIGH";
  if (nivelRisco >= 4) return "MEDIUM";
  return "LOW";
}

/**
 * Calcula score numérico
 */
function calculateScore(nivelRisco) {
  return Math.min(nivelRisco * 10, 100);
}

/**
 * Calcula índice sistêmico global (0–100)
 */
function calculateSystemicIndex(events = []) {
  if (!events.length) return 0;

  const total = events.reduce((sum, e) => {
    return sum + (e.score || 0);
  }, 0);

  return Math.round(total / events.length);
}

module.exports = {
  classifyRisk,
  calculateScore,
  calculateSystemicIndex
};
