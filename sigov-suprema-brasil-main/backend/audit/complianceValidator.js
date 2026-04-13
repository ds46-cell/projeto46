function validateCompliance(decision) {
  if (!decision.decisionId) throw new Error('NO_DECISION_ID');
  if (!decision.timestamp) throw new Error('NO_TIMESTAMP');

  if (decision.score > 80 && decision.action === 'ALLOW') {
    throw new Error('COMPLIANCE_VIOLATION_HIGH_RISK_ALLOWED');
  }

  return true;
}

module.exports = {
  validateCompliance
};
