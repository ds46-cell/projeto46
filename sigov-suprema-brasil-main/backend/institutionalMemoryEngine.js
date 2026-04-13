// backend/institutionalMemoryEngine.js

const institutionalLedger = [];

/**
 * Armazena decisões soberanas assinadas
 */
function storeInstitutionalDecision(signedDecision) {
  institutionalLedger.push({
    ...signedDecision,
    storedAt: new Date().toISOString()
  });

  return {
    version: institutionalLedger.length,
    totalDecisions: institutionalLedger.length
  };
}

/**
 * Recupera histórico institucional
 */
function getInstitutionalHistory() {
  return institutionalLedger;
}

module.exports = {
  storeInstitutionalDecision,
  getInstitutionalHistory
};
