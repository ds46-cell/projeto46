function calculateRisk(transaction, history) {
  let score = 0;

  if (transaction.amount > 10000) score += 30;
  if (transaction.amount > 50000) score += 40;
  if (history.recentTx > 5) score += 20;

  let classification = 'LOW';
  if (score >= 70) classification = 'CRITICAL';
  else if (score >= 50) classification = 'HIGH';
  else if (score >= 30) classification = 'MEDIUM';

  return { score, classification };
}

module.exports = { calculateRisk };
