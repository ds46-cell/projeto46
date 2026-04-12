import crypto from 'crypto';
import pool from '../db.js';

function hash(data) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
}

export async function writeLedger({
  decision_id,
  action,
  actor,
  payload
}) {
  const last = await pool.query(
    `SELECT current_hash
       FROM decision_ledger
      WHERE decision_id = $1
      ORDER BY created_at DESC
      LIMIT 1`,
    [decision_id]
  );

  const previous_hash = last.rows[0]?.current_hash || null;

  const current_hash = hash({
    decision_id,
    action,
    actor,
    payload,
    previous_hash
  });

  await pool.query(
    `INSERT INTO decision_ledger
     (decision_id, action, actor, payload, previous_hash, current_hash)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      decision_id,
      action,
      actor,
      payload,
      previous_hash,
      current_hash
    ]
  );
}
