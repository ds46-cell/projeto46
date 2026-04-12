import { pool } from '../config/database.js';

export const getDashboard = async (req, res) => {
  try {
    const totalTransactions = await pool.query('SELECT COUNT(*) FROM transactions');
    const totalBlocked = await pool.query("SELECT COUNT(*) FROM transactions WHERE decision='BLOCKED'");
    const highRisk = await pool.query("SELECT COUNT(*) FROM transactions WHERE classification IN ('HIGH','CRITICAL')");
    const scoreAvg = await pool.query('SELECT AVG(score) FROM transactions');
    const recentEvents = await pool.query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10');

    res.json({
      totalTransactions: parseInt(totalTransactions.rows[0].count),
      totalBlocked: parseInt(totalBlocked.rows[0].count),
      highRiskCount: parseInt(highRisk.rows[0].count),
      averageScore: parseFloat(scoreAvg.rows[0].avg),
      recentEvents: recentEvents.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao gerar dashboard' });
  }
};
