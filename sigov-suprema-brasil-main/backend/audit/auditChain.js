const { recordDecision, readLedger, validateLedger } = require('./audit/auditChain');

const entry = recordDecision({
  decisionId: 'DEC-123',
  entityId: 'ORG-001',
  action: 'MONITOR',
  riskLevel: 'MEDIUM',
  score: 67,
  reason: 'Risk classified as MEDIUM',
});

console.log(entry); // Retorna o registro completo com hash
console.log(readLedger()); // Retorna todos os registros
console.log(validateLedger()); // Retorna { valid: true } se tudo estiver correto
