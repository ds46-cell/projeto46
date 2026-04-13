import crypto from "crypto";
import pool from "../db/pool.js";

export async function appendLedger(decisionId, event, payload) {
  const last = await pool.query(
    "SELECT current_hash FROM ledger ORDER BY created_at DESC LIMIT 1"
  );

  const previousHash = last.rows[0]?.current_hash || null;
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ decisionId, event, payload, previousHash }))
    .digest("hex");

  await pool.query(
    `INSERT INTO ledger VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())`,
    [decisionId, event, payload, previousHash, hash]
  );
}
