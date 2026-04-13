// backend/futureImpactEngine.js

function projectImpact(event, systemicIndex) {
  const baseRisk = event.nivelRisco || 0;
  const systemicPressure = systemicIndex || 0;

  function horizonImpact(months, multiplier) {
    const rawImpact = (baseRisk * multiplier) + (systemicPressure * 0.3);

    let level = "LOW";
    if (rawImpact >= 80) level = "CRITICAL";
    else if (rawImpact >= 60) level = "HIGH";
    else if (rawImpact >= 40) level = "MODERATE";

    return {
      horizonMonths: months,
      impactScore: Math.round(rawImpact),
      level,
      probability: Math.min(0.95, (rawImpact / 100)),
      description: `Projected ${level} impact within ${months} months`
    };
  }

  return {
    shortTerm: horizonImpact(3, 6),
    midTerm: horizonImpact(12, 8),
    longTerm: horizonImpact(36, 10),
    generatedAt: new Date().toISOString()
  };
}

module.exports = {
  projectImpact
};
