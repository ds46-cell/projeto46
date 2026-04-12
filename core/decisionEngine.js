function analyzeDecision({ value, criticality }) {
  const v = Number(value);
  const c = Number(criticality);

  if (isNaN(v) || isNaN(c)) {
    throw new Error("Invalid input");
  }

  // 📊 RISCO (0 → 1)
  let risk = (c / 10) * (v / 10000);
  if (risk > 1) risk = 1;
  if (risk < 0) risk = 0;

  // 💰 IMPACTO
  const impact = v * (1 - risk);

  // 🧠 RECOMENDAÇÃO
  let recommendation = "APPROVE";

  if (risk > 0.75) recommendation = "REJECT";
  else if (risk > 0.4) recommendation = "REVIEW";

  return {
    risk,
    impact,
    recommendation,
  };
}

// 🔥 EXPORT CORRETO
module.exports = {
  analyzeDecision,
};