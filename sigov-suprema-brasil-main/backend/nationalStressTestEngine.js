// backend/nationalStressTestEngine.js

function runNationalStressTest(systemicIndex, geoImpact) {
  let resilience = 100 - systemicIndex;

  if (geoImpact?.severity === "HIGH") {
    resilience -= 20;
  }

  if (geoImpact?.affectedSectors?.length > 2) {
    resilience -= 15;
  }

  let result = "RESILIENT";

  if (resilience < 60) result = "VULNERABLE";
  if (resilience < 35) result = "CRITICAL";
  if (resilience < 20) result = "COLLAPSE RISK";

  return {
    resilience,
    result,
    recommendation:
      result === "COLLAPSE RISK"
        ? "Immediate sovereign intervention required."
        : "Continuous monitoring recommended."
  };
}

module.exports = {
  runNationalStressTest
};
