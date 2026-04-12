/**
 * SIGOV — Sovereign Ledger
 * Registro imutável de decisões soberanas
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const LEDGER_PATH = path.join(__dirname, "ledger.json");

function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) {
    fs.writeFileSync(LEDGER_PATH, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(LEDGER_PATH, "utf-8"));
}

function generateBlockHash(block) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(block))
    .digest("hex");
}

function appendToLedger(decision) {
  const ledger = loadLedger();

  const previousHash = ledger.length
    ? ledger[ledger.length - 1].blockHash
    : "GENESIS";

  const block = {
    index: ledger.length,
    timestamp: new Date().toISOString(),
    previousHash,
    decision,
  };

  block.blockHash = generateBlockHash(block);

  ledger.push(block);
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));

  return block;
}

module.exports = {
  appendToLedger,
};
