// backend/simulationEngine.js

/**
 * Simula cenários futuros com base no índice sistêmico
 */
function runSimulation({ country, sector, systemicIndex, events }) {
  let scenario = "STABLE";
  let impactLevel = "LOW";
  let probability = 0.1;

  if (systemicIndex >= 70) {
    scenario = "SYSTEMIC COLLAPSE";
    impactLevel = "EXTREME";
    probability = 0.85;
  } else if (systemicIndex >= 50) {
    scenario = "SEVERE DISRUPTION";
    impactLevel = "HIGH";
    probability = 0.65;
  } else if (systemicIndex >= 30) {
    scenario = "ESCALATING INSTABILITY";
    impactLevel = "MEDIUM";
    probability = 0.4;
  }

  return {
    country,
    sector,
    scenario,
    impactLevel,
    probability,
    systemicIndex,
    simulatedAt: new Date().toISOString()
  };
}

module.exports = {
  runSimulation
};
