/**
 * Geo-Political Impact Engine
 * Avalia impacto regional e internacional
 */

function analyzeGeoImpact({ country, sector, risk, systemicIndex }) {
  const impacts = [];

  if (systemicIndex >= 70) {
    impacts.push({
      region: "Global",
      level: "CRITICAL",
      description: "High probability of international geopolitical instability"
    });
  } else if (systemicIndex >= 50) {
    impacts.push({
      region: "Regional",
      level: "HIGH",
      description: "Cross-border economic and political stress detected"
    });
  } else {
    impacts.push({
      region: "Domestic",
      level: "LOW",
      description: "Contained national impact"
    });
  }

  return {
    country,
    sector,
    risk,
    systemicIndex,
    impacts,
    evaluatedAt: new Date().toISOString()
  };
}

module.exports = {
  analyzeGeoImpact
};
