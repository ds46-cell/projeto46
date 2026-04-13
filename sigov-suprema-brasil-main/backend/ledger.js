const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const LEDGER_FILE = path.join(__dirname, "ledger.json");

function loadLedger() {
  if (!fs.existsSync(LEDGER_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(LEDGER_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao carregar ledger:", err);
    return [];
  }
}

function saveLedger(ledger) {
  fs.writeFileSync(
    LEDGER_FILE,
    JSON.stringify(ledger, null, 2),
    "utf-8"
  );
}

let ledger = loadLedger();

function appendEvent(event) {
  const previousHash =
    ledger.length === 0 ? "GENESIS" : ledger[ledger.length - 1].hash;

  const timestamp = new Date().toISOString();

  const payload = JSON.stringify({
    timestamp,
    event,
    previousHash
  });

  const hash = crypto
    .createHash("sha256")
    .update(payload)
    .digest("hex");

  const block = {
    timestamp,
    ...event,
    previousHash,
    hash
  };

  ledger.push(block);
  saveLedger(ledger);

  return hash;
}

function getLedger() {
  return ledger;
}

module.exports = {
  appendEvent,
  getLedger
};
