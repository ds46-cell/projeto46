const { evaluateRisk } = require('./risk/systemicExposureEngine');
const audit = require('./audit/externalAudit');
const license = require('./contract/sovereignLicense');
const { registerDecision } = require('./decisionRegistry');
const fs = require('fs');
const path = require('path');

function loadDecisionPolicy() {
  const policyPath = path.join(__dirname, 'policy', 'decisionPolicy.json');
  if (!fs.existsSync(policyPath)) {
    throw new Error('Decision policy file not found');
  }
  return JSON.parse(fs.readFileSync(policyPath, 'utf-8'));
}

module.exports.executeDecision = function (entityId, context) {
  // 🔐 Validação contratual soberana
  license.validate(entityId);

  // 🧠 Avaliação de risco sistêmico
  const decision = evaluateRisk(entityId, context);

  // 🧾 Auditoria externa imutável
  const auditResult = audit(decision);

  // 📦 Decisão final consolidada
  const finalDecision = {
    ...decision,
    auditTimestamp: auditResult.timestamp,
    auditHash: auditResult.hash
  };

  // 🏛️ GOVERNANÇA — VERSIONAMENTO HISTÓRICO
  try {
    const governanceInfo = registerDecision(finalDecision);

    finalDecision.governance = {
      version: governanceInfo.version,
      integrityHash: governanceInfo.integrityHash
    };
  } catch (err) {
    console.error('[GOVERNANCE] Registry failure:', err.message);
  }

  return finalDecision;
};
