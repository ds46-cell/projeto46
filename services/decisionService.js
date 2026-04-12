// services/decisionService.js
const riskEngine = require("../engines/riskEngine");
const impactEngine = require("../engines/impactEngine");
const recommendationEngine = require("../engines/recommendationEngine");

function analyzeDecision(value, criticality) {
  const risk = riskEngine(value, criticality);
  const impact = impactEngine(value, risk);
  const recommendation = recommendationEngine(risk);

  return { risk, impact, recommendation };
}

module.exports = { analyzeDecision };