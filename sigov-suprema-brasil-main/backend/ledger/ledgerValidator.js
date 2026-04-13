const crypto = require("crypto");

function validateLedger(ledger) {
  for (let i = 1; i < ledger.length; i++) {
    const current = ledger[i];
    const previous = ledger[i - 1];

    const recalculatedHash = crypto
      .createHash("sha256")
      .update(JSON.stringify({
        index: current.index,
        timestamp: current.timestamp,
        data: current.data,
        previousHash: current.previousHash
      }))
      .digest("hex");

    if (current.previousHash !== previous.hash) {
      return { valid: false, error: `Broken chain at block ${current.index}` };
    }

    if (current.hash !== recalculatedHash) {
      return { valid: false, error: `Tampered block at ${current.index}` };
    }
  }

  return { valid: true };
}

module.exports = { validateLedger };
