// backend/geoRiskPropagationEngine.js

const { getCountryProfile } = require("./geoPoliticalMap");

function propagateGeoRisk(country, sector, riskLevel) {
  const profile = getCountryProfile(country);
  if (!profile) return [];

  const impacts = [];

  profile.dependencies.forEach(dep => {
    let impactScore = Math.round(riskLevel * dep.weight * 10);

    impacts.push({
      affectedCountry: dep.country,
      originatingCountry: country,
      sector,
      impactScore,
      severity:
        impactScore >= 70 ? "CRITICAL" :
        impactScore >= 40 ? "HIGH" :
        impactScore >= 20 ? "MODERATE" :
        "LOW"
    });
  });

  return impacts;
}

module.exports = {
  propagateGeoRisk
};
