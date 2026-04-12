const riskEngine = require("./riskEngine");
const impactEngine = require("./impactEngine");
const recommendationEngine = require("./recommendationEngine");

function simulate(value, criticality, delta) {
  const newValue = value * delta;

  const risk = riskEngine(newValue, criticality);
  const impact = impactEngine(newValue, risk);
  const recommendation = recommendationEngine(risk);

  return {
    simulatedValue: newValue,
    risk,
    impact,
    recommendation,
  };
}

module.exports = simulate;