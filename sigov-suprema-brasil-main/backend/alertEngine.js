// backend/alertEngine.js

/**
 * Gera alertas sistêmicos com base no índice e simulações
 */
function generateAlert(systemicIndex, simulation) {
  if (systemicIndex >= 70) {
    return {
      level: "EMERGENCY",
      message: "Systemic collapse imminent",
      recommendedAction: "Immediate sovereign intervention required"
    };
  }

  if (systemicIndex >= 50) {
    return {
      level: "ALERT",
      message: "Severe systemic instability detected",
      recommendedAction: "Activate national contingency protocols"
    };
  }

  if (systemicIndex >= 30) {
    return {
      level: "WARNING",
      message: "Elevated systemic stress",
      recommendedAction: "Enhanced monitoring required"
    };
  }

  return {
    level: "NORMAL",
    message: "System stable",
    recommendedAction: "No immediate action required"
  };
}

module.exports = {
  generateAlert
};
