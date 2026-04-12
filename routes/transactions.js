import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Criar transação
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;

    const result = await pool.query(
      'INSERT INTO transactions (user_id, amount, description) VALUES ($1,$2,$3) RETURNING *',
      [req.user.id, amount, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar transações do usuário
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id=$1 ORDER BY id DESC',
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM transactions WHERE id=$1 AND user_id=$2',
      [req.params.id, req.user.id]
    );

    res.json({ message: 'Transação removida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
