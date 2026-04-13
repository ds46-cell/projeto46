// backend/alternateFutureSimulator.js

function simulateAlternateFutures(event, futureImpact) {
  function path(name, modifier) {
    const base = futureImpact.longTerm.impactScore * modifier;

    let stability = "HIGH";
    if (base >= 85) stability = "COLLAPSE";
    else if (base >= 65) stability = "LOW";
    else if (base >= 45) stability = "MODERATE";

    return {
      path: name,
      projectedImpact: Math.round(base),
      systemicStability: stability,
      collapseProbability: Math.min(0.98, base / 100),
      strategicCost: Math.round(base * 1.4),
      summary: `${name} path leads to ${stability} systemic stability`
    };
  }

  return {
    inaction: path("INACTION", 1.2),
    mitigation: path("MITIGATION", 0.7),
    escalation: path("ESCALATION", 1.5),
    simulatedAt: new Date().toISOString()
  };
}

module.exports = {
  simulateAlternateFutures
};
