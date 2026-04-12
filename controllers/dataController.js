import { openDb } from '../db.js';

export async function getEntities(req, res) {
  const db = await openDb();
  const entities = await db.all('SELECT * FROM entities');
  res.json(entities);
}

export async function addEntity(req, res) {
  const { id, riskLevel, projectedLossUSD, extremeScenariosCount, score } = req.body;
  const db = await openDb();
  await db.run(
    'INSERT OR REPLACE INTO entities(id,riskLevel,projectedLossUSD,extremeScenariosCount,score) VALUES(?,?,?,?,?)',
    [id, riskLevel, projectedLossUSD, extremeScenariosCount, score]
  );
  res.json({ status: 'ok' });
}
