import crypto from 'crypto';
import { getLedger } from './ledger.service.js';

export function generateLedgerAnchor() {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(getLedger()))
    .digest('hex');
}
