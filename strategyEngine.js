// backend/strategyEngine.js

function generateStrategy(alert, forecast, systemicIndex) {
  if (!alert) return null;

  if (alert.level === "EMERGENCY") {
    return {
      scenario: "SYSTEMIC COLLAPSE",
      priority: "MAXIMUM",
      actions: [
        "Activate emergency liquidity protocols",
        "Immediate executive and regulatory intervention",
        "Cross-sector containment measures"
      ],
      confidence: 0.9
    };
  }

  if (alert.level === "ALERT") {
    return {
      scenario: "SYSTEMIC ESCALATION",
      priority: "HIGH",
      actions: [
        "Increase capital reserves",
        "Restrict high-risk exposures",
        "Initiate cross-sector monitoring"
      ],
      confidence: 0.75
    };
  }

  if (systemicIndex >= 40) {
    return {
      scenario: "SYSTEMIC PRESSURE",
      priority: "MEDIUM",
      actions: [
        "Enhanced monitoring",
        "Preventive policy adjustments"
      ],
      confidence: 0.6
    };
  }

  return null;
}

module.exports = {
  generateStrategy
};
