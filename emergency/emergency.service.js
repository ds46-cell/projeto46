export function emergencyOverride(decision) {
  decision.emergency = true;
  decision.audit_required = true;
  return decision;
}
