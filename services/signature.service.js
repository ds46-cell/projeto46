import crypto from 'crypto';

export function signDecision(decision, signer) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(decision) + signer)
    .digest('hex');
}
