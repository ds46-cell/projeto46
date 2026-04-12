import crypto from "crypto";

export function generateExecutionToken(decisionId) {
  return crypto
    .createHash("sha256")
    .update(decisionId + process.env.SIGOV_SECRET)
    .digest("hex");
}
