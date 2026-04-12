const { detectAnomalies } = require('./anomalyEngine');
const { selfHeal } = require('./selfHealing');
const { logDecision } = require('./logger');

function runBrain(input) {
  const anomalies = detectAnomalies(input);

  let status = 'OK';
  if (anomalies.length > 0) {
    selfHeal(anomalies);
    status = 'CORRECTED';
  }

  const decision = {
    timestamp: Date.now(),
    entityId: input.entityId,
    score: input.score,
    anomalies,
    status
  };

  logDecision(decision);
  return decision;
}

module.exports = { runBrain };
