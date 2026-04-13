export function calculateRisk(context = {}) {
  const {
    amount = 0,
    country_risk = 10,
    regulatory_risk = 10,
    liquidity_risk = 10,
    geopolitical_risk = 10
  } = context;

  const base =
    country_risk * 0.25 +
    regulatory_risk * 0.25 +
    liquidity_risk * 0.25 +
    geopolitical_risk * 0.25;

  const exposureFactor = Math.min(amount / 1_000_000, 2);

  const score = Math.round(base * exposureFactor * 10);

  return Math.min(score, 100);
}
