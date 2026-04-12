export const TRANSITIONS = {
  CREATED: ['ANALYZED'],
  ANALYZED: ['AUTHORIZED', 'BLOCKED'],
  AUTHORIZED: ['APPROVED'],
  APPROVED: ['EXECUTABLE'],
  EXECUTABLE: [],
  BLOCKED: [],
  REVOKED: []
};

export function assertTransition(from, to) {
  if (!TRANSITIONS[from]?.includes(to)) {
    throw new Error(`Transição ilegal: ${from} → ${to}`);
  }
}
