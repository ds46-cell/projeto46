const ledger = [];

function append(entry) {
  ledger.push({
    ...entry,
    ledgerIndex: ledger.length,
    sealedAt: Date.now()
  });
  return ledger[ledger.length - 1];
}

function getAll() {
  return ledger;
}

module.exports = {
  append,
  getAll
};
/**
 * Immutable Audit Ledger (Append-Only)
 * Legal-grade audit storage
 */

const fs = require('fs');
const path = require('path');

const LEDGER_PATH = path.join(__dirname, 'ledger.log');

function appendToLedger(entry) {
  const record = {
    ...entry,
    ledgerTimestamp: Date.now()
  };

  fs.appendFileSync(
    LEDGER_PATH,
    JSON.stringify(record) + '\n',
    { encoding: 'utf8' }
  );

  return record;
}

function readLedger() {
  if (!fs.existsSync(LEDGER_PATH)) return [];

  return fs
    .readFileSync(LEDGER_PATH, 'utf8')
    .trim()
    .split('\n')
    .map(line => JSON.parse(line));
}

module.exports = {
  appendToLedger,
  readLedger
};
