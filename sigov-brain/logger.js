const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'audit.log');

function logDecision(decision) {
  fs.appendFileSync(logFile, JSON.stringify(decision) + '\n');
}

module.exports = { logDecision };
