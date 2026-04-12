function evaluateRisk(entityId, context = {}) {
  const exposure = context.exposure || Math.floor(Math.random() * 100);
  const volatility = context.volatility || Math.floor(Math.random() * 100);

  const score = Math.floor((exposure + volatility) / 2);

  let riskLevel = 'LOW';
  let action = 'ALLOW';

  if (score > 60) {
    riskLevel = 'MEDIUM';
    action = 'MONITOR';
  }

  if (score > 80) {
    riskLevel = 'HIGH';
    action = 'BLOCK';
  }

  return {
    decisionId: `DEC-${Date.now()}`,
    entityId,
    action,
    riskLevel,
    score,
    reason: `Risk classified as ${riskLevel} with score ${score}`,
    timestamp: Date.now()
  };
}

module.exports = {
  evaluateRisk
};
