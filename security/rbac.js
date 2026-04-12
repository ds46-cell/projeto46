export const ROLES = {
  CREATOR: ["CREATE"],
  ANALYST: ["ANALYZE"],
  AUTHORITY: ["AUTHORIZE"],
  APPROVER: ["APPROVE"],
  EXECUTOR: ["EXECUTE"]
};

export function can(role, action) {
  return ROLES[role]?.includes(action);
}
