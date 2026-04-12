recommendationEngine.jsfunction impactEngine(value, risk) {
  return Math.min(100, (value / 1000) * (1 - risk));
}

module.exports = impactEngine;