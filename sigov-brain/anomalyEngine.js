function detectAnomalies(data) {
  const issues = [];

  if (data.score > 90) issues.push('SCORE_CRITICAL');
  if (data.projectedLossUSD > 5000000) issues.push('FINANCIAL_RISK');
  if (data.extremeScenariosCount > 5) issues.push('SCENARIO_OVERLOAD');

  return issues;
}

module.exports = { detectAnomalies };
