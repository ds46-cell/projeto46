// backend/audit/auditEngine.js
const crypto = require('crypto');

module.exports.generateAudit = function(entityId, decision) {
    const auditTimestamp = Date.now();
    const hash = crypto.createHash('sha256')
        .update(JSON.stringify({ ...decision, entityId, auditTimestamp }))
        .digest('hex');

    return {
        auditTimestamp,
        auditHash: hash,
        executiveReport: {
            reportId: 'RPT-' + auditTimestamp,
            summary: {
                entity: entityId,
                risk: decision.riskLevel,
                action: decision.action
            },
            justification: decision.reason,
            score: decision.score,
            generatedAt: new Date(auditTimestamp).toISOString()
        }
    };
};
