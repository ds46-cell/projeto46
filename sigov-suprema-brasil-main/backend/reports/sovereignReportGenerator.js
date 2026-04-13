/**
 * SIGOV — Sovereign Report Generator
 * Relatórios executivos formais
 */

function generateSovereignReport(decision, audit, ledgerBlock) {
  return {
    header: {
      system: "SIGOV",
      classification: "OFFICIAL_USE_ONLY",
      generatedAt: new Date().toISOString(),
    },
    decisionSummary: {
      country: decision.country,
      sector: decision.sector,
      empresa: decision.empresa,
      tipo: decision.tipo,
      nivelRisco: decision.nivelRisco,
      systemicIndex: decision.systemicIndex,
    },
    sovereignAction: decision.sovereignDecision,
    juridicalAudit: audit,
    ledgerReference: {
      blockIndex: ledgerBlock.index,
      blockHash: ledgerBlock.blockHash,
      previousHash: ledgerBlock.previousHash,
    },
  };
}

module.exports = {
  generateSovereignReport,
};
