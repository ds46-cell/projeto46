import crypto from 'crypto';
import pool from '../db.js';

export async function writeLedger(entry) {
  const last = await pool.query(
    `SELECT hash FROM decision_ledger
     WHERE decision_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [entry.decision_id]
  );

  const previous_hash = last.rowCount ? last.rows[0].hash : null;

  const payload = JSON.stringify({
    ...entry,
    previous_hash
  });

  const hash = crypto
    .createHash('sha256')
    .update(payload)
    .digest('hex');

  await pool.query(
    `INSERT INTO decision_ledger
     (decision_id, action, actor, role, previous_status, new_status,
      risk_score, justification, hash, previous_hash)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      entry.decision_id,
      entry.action,
      entry.actor,
      entry.role,
      entry.previous_status,
      entry.new_status,
      entry.risk_score,
      entry.justification,
      hash,
      previous_hash
    ]
  );
}
