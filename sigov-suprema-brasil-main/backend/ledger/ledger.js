const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const LEDGER_FILE = path.join(__dirname, "ledger.json");

function loadLedger() {
  if (!fs.existsSync(LEDGER_FILE)) return [];
  return JSON.parse(fs.readFileSync(LEDGER_FILE, "utf8"));
}

function saveLedger(ledger) {
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));
}

function hashBlock(block) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(block))
    .digest("hex");
}

function appendEvent(data) {
  const ledger = loadLedger();

  const previousHash =
    ledger.length === 0 ? "GENESIS" : ledger[ledger.length - 1].hash;

  const block = {
    timestamp: new Date().toISOString(),
    ...data,
    previousHash
  };

  block.hash = hashBlock(block);

  ledger.push(block);
  saveLedger(ledger);

  return block.hash;
}

function getLedger() {
  return loadLedger();
}

module.exports = {
  appendEvent,
  getLedger
};
