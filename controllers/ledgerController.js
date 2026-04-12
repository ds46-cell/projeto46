import pool from '../db.js';

export async function writeDecisionLedger(decisionId, action, data = {}) {
  await pool.query(
    `INSERT INTO decision_ledger (decision_id, action, data)
     VALUES ($1, $2, $3)`,
    [decisionId, action, data]
  );
}

export async function getLedgerByDecision(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * FROM decision_ledger
     WHERE decision_id = $1
     ORDER BY created_at ASC`,
    [id]
  );
  res.json(result.rows);
}
