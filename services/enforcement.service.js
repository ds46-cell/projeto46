export function enforceExecutable(decision) {
  if (decision.status !== 'EXECUTABLE') {
    throw new Error('DECISION_BLOCKED: status não EXECUTABLE');
  }

  if (!decision.execution_token) {
    throw new Error('DECISION_BLOCKED: token ausente');
  }

  if (!decision.signature_hash) {
    throw new Error('DECISION_BLOCKED: decisão não assinada');
  }

  return true;
}
