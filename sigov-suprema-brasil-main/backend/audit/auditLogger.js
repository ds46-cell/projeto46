const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const LOG_DIR = path.join(__dirname, '../logs');
const AUDIT_PATH = path.join(LOG_DIR, 'audit.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

function logDecision(decision) {
  const entry = {
    ...decision,
    auditTimestamp: Date.now(),
    hash: generateHash(decision)
  };

  fs.appendFileSync(AUDIT_PATH, JSON.stringify(entry) + '\n');
  return entry;
}

function generateHash(data) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
}

module.exports = {
  logDecision
};
