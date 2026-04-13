/**
 * Audit Trail with Immutable Ledger
 */

const crypto = require('crypto');
const { appendToLedger } = require('./immutableLedger');

function recordAudit(decision) {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(decision))
    .digest('hex');

  return appendToLedger({
    type: 'DECISION_AUDIT',
    decisionId: decision.decisionId,
    entityId: decision.entityId,
    action: decision.action,
    riskLevel: decision.riskLevel,
    score: decision.score,
    hash,
    timestamp: decision.timestamp
  });
}

module.exports = { recordAudit };
