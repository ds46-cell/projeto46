const crypto = require("crypto");

const SECRET = "SIGOV_SOVEREIGN_KEY";

function signDecision(hash) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(hash)
    .digest("hex");
}

function verifySignature(hash, signature) {
  const expected = signDecision(hash);
  if (expected !== signature) {
    throw new Error("Invalid sovereign signature");
  }
  return true;
}

module.exports = { signDecision, verifySignature };
