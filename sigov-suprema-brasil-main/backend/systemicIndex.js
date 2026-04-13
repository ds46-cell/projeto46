const { getLedger } = require("./ledger");

function calculateSystemicIndex() {
  const ledger = getLedger();

  if (!ledger.length) {
    return {
      index: 0,
      level: "STABLE",
      message: "No systemic risk detected"
    };
  }

  let totalScore = 0;

  ledger.forEach(event => {
    if (event.data && typeof event.data.score === "number") {
      totalScore += event.data.score;
    }
  });

  const index = Math.min(100, Math.round(totalScore / ledger.length));

  let level = "STABLE";
  let message = "System stable";

  if (index >= 80) {
    level = "CRITICAL";
    message = "Systemic collapse risk imminent";
  } else if (index >= 60) {
    level = "HIGH";
    message = "High systemic risk detected";
  } else if (index >= 40) {
    level = "MODERATE";
    message = "Moderate systemic risk";
  }

  return {
    index,
    level,
    message
  };
}

module.exports = {
  calculateSystemicIndex
};
