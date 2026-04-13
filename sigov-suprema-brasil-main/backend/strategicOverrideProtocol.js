// backend/strategicOverrideProtocol.js

function applyStrategicOverride(decisionConfidence, sovereignPriority) {
  let overrideApplied = false;
  let finalRecommendation = decisionConfidence.recommendation;
  let justification = null;

  if (
    sovereignPriority === "ABSOLUTE" &&
    decisionConfidence.recommendation === "RECONSIDER"
  ) {
    overrideApplied = true;
    finalRecommendation = "OVERRIDE_PROCEED";
    justification = "Sovereign authority override due to national priority";
  }

  if (
    sovereignPriority === "EMERGENCY" &&
    decisionConfidence.confidence < 0.4
  ) {
    overrideApplied = true;
    finalRecommendation = "EMERGENCY_ACTION";
    justification = "Emergency override under critical national conditions";
  }

  return {
    overrideApplied,
    finalRecommendation,
    originalRecommendation: decisionConfidence.recommendation,
    confidence: decisionConfidence.confidence,
    justification,
    executedAt: new Date().toISOString()
  };
}

module.exports = {
  applyStrategicOverride
};
