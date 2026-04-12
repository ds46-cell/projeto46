export const RISK_LIMIT = 7;

export function evaluateRisk(riskScore) {
  if (riskScore >= RISK_LIMIT) {
    return 'BLOCKED';
  }
  return 'ALLOWED';
}