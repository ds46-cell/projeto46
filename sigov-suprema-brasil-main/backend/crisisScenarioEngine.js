/**
 * Crisis Scenario Engine
 * Simula cenários extremos de colapso sistêmico
 */

function runCrisisScenario({ country, sector, systemicIndex, alertLevel }) {
  let scenario = "NORMAL_OPERATION";
  let severity = "LOW";
  let description = "No immediate crisis detected";

  if (alertLevel === "EMERGENCY" || systemicIndex >= 80) {
    scenario = "NATIONAL_SYSTEMIC_COLLAPSE";
    severity = "EXTREME";
    description =
      "Nationwide collapse with cascading failures across critical sectors";
  } else if (alertLevel === "ALERT" || systemicIndex >= 60) {
    scenario = "MULTI_SECTOR_CRISIS";
    severity = "HIGH";
    description =
      "Severe crisis affecting multiple strategic sectors";
  } else if (systemicIndex >= 40) {
    scenario = "SECTORIAL_CRISIS";
    severity = "MEDIUM";
    description =
      "Sector-specific crisis with potential escalation";
  }

  return {
    country,
    sector,
    scenario,
    severity,
    description,
    simulatedAt: new Date().toISOString()
  };
}

module.exports = {
  runCrisisScenario
};
