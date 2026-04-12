// services/ledger.service.js
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ledgerFile = path.resolve('ledger.json');

function appendLedger(event) {
    const hash = crypto.createHash('sha256').update(JSON.stringify(event)).digest('hex');
    const ledgerEntry = { ...event, hash, timestamp: new Date().toISOString() };
    let ledger = [];
    if (fs.existsSync(ledgerFile)) {
        ledger = JSON.parse(fs.readFileSync(ledgerFile));
    }
    ledger.push(ledgerEntry);
    fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));
    return ledgerEntry;
}

function getLedger() {
    if (!fs.existsSync(ledgerFile)) return [];
    return JSON.parse(fs.readFileSync(ledgerFile));
}

export default { appendLedger, getLedger };
