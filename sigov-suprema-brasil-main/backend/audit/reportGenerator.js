function generate(decision) {
  return {
    reportId: `RPT-${Date.now()}`,
    summary: {
      entity: decision.entityId,
      risk: decision.riskLevel,
      action: decision.action
    },
    justification: decision.reason,
    score: decision.score,
    generatedAt: new Date().toISOString()
  }
}

module.exports = { generate }
