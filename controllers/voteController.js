import pool from '../db.js';

export async function vote(req, res) {
  const { decision_id, committee_id, member_name, vote } = req.body;

  try {
    await pool.query(
      `INSERT INTO decision_votes (decision_id, committee_id, member_name, vote)
       VALUES ($1,$2,$3,$4)`,
      [decision_id, committee_id, member_name, vote]
    );

    res.json({ message: 'Voto registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar voto' });
  }
}
