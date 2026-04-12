const fs = require('fs');
const { executeBrain } = require('../brain/brainController');

async function executeDecision(entityId, riskLevel) {
  // Executa o SIGOV-BRAIN para decidir ações
  const brainOutput = await executeBrain({ entityId, riskLevel });

  return {
    decisionId: `DEC-${Date.now()}`,
    entityId,
    action: brainOutput.action,
    riskLevel,
    score: brainOutput.score,
    reason: brainOutput.reason,
    timestamp: Date.now(),
    executionMode: 'LIVE',
    decidedAt: Date.now(),
    simulated: false,
    auditHash: brainOutput.auditHash,
    financialImpact: brainOutput.financialImpact,
  };
}

module.exports = { executeDecision };
