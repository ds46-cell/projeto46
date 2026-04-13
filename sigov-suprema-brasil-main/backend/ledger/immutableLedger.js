const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ledgerFile = path.join(__dirname, "immutable-ledger.json");

function hashBlock(block) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(block))
    .digest("hex");
}

function loadLedger() {
  if (!fs.existsSync(ledgerFile)) return [];
  return JSON.parse(fs.readFileSync(ledgerFile));
}

function appendToLedger(entry) {
  const ledger = loadLedger();
  const previousHash = ledger.length ? ledger[ledger.length - 1].hash : "GENESIS";

  const block = {
    index: ledger.length + 1,
    timestamp: new Date().toISOString(),
    data: entry,
    previousHash
  };

  block.hash = hashBlock(block);
  ledger.push(block);

  fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));
  return block;
}

module.exports = { appendToLedger, loadLedger };
