module.exports = {
  generate(entityId) {
    return {
      contractId: `CTR-${Date.now()}`,
      entityId,
      valueUSD: 20000000,
      durationMonths: 12,
      clauses: [
        'Uso exclusivo',
        'Auditoria contínua',
        'Sigilo absoluto',
        'Kill-switch soberano'
      ]
    };
  }
};
