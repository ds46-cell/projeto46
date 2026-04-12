import { v4 as uuidv4 } from 'uuid';
import pool from '../db.js';

export async function createCommittee(req, res) {
  const { name, quorum } = req.body;

  try {
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO committees (id, name, quorum)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, name, quorum]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar comitê' });
  }
}
