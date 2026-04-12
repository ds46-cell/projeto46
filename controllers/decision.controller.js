// controllers/decisionController.js
const pool = require("../config/db");
const { analyzeDecision } = require("../services/decisionService");
const simulate = require("../engines/simulationEngine");

async function analyze(req, res) {
  try {
    const { title, value, criticality, simulateDelta } = req.body;

    const result = analyzeDecision(value, criticality);

    const simulation = simulateDelta
      ? simulate(value, criticality, simulateDelta)
      : null;

    const db = await pool.query(
      `INSERT INTO decisions
      (org_id,user_id,title,value,criticality,risk,impact,recommendation)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        req.user.org_id,
        req.user.id,
        title || "Decision",
        value,
        criticality,
        result.risk,
        result.impact,
        result.recommendation,
      ]
    );

    res.json({
      success: true,
      data: db.rows[0],
      simulation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { analyze };