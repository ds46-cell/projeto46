function recommendationEngine(risk) {
  if (risk > 0.7) return "REJECT";
  if (risk > 0.4) return "REVIEW";
  return "APPROVE";
}

module.exports = recommendationEngine;