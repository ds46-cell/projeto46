import crypto from "crypto";

export function generateExecutionToken(decisionId) {
  return crypto
    .createHash("sha256")
    .update("SIGOV_SECRET_" + decisionId)
    .digest("hex");
}
