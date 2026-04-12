// backend/sovereignSignatureEngine.js

const crypto = require("crypto");

/**
 * Assina uma decisão soberana de forma imutável
 */
function signSovereignDecision({
  country,
  systemicIndex,
  alert,
  strategy,
  finalDecision
}) {
  const payload = {
    country,
    systemicIndex,
    alert,
    strategy,
    finalDecision,
    version: "9.1.0",
    authority: "SIGOV_CORE",
    signedAt: new Date().toISOString()
  };

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");

  return {
    ...payload,
    sovereignHash: hash
  };
}

module.exports = {
  signSovereignDecision
};