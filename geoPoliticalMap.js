// backend/geoPoliticalMap.js

const geoPoliticalMap = {
  Germany: {
    bloc: "EU",
    criticalSectors: ["Energy", "Industry", "Finance"],
    dependencies: [
      { country: "France", weight: 0.7 },
      { country: "Italy", weight: 0.6 },
      { country: "Netherlands", weight: 0.5 },
      { country: "Poland", weight: 0.4 }
    ]
  },

  France: {
    bloc: "EU",
    criticalSectors: ["Energy", "Defense", "Finance"],
    dependencies: [
      { country: "Germany", weight: 0.7 },
      { country: "Spain", weight: 0.4 }
    ]
  },

  USA: {
    bloc: "NATO",
    criticalSectors: ["Finance", "Defense", "Energy"],
    dependencies: [
      { country: "EU", weight: 0.6 },
      { country: "Japan", weight: 0.5 }
    ]
  },

  China: {
    bloc: "BRICS",
    criticalSectors: ["Industry", "Technology", "Energy"],
    dependencies: [
      { country: "EU", weight: 0.6 },
      { country: "USA", weight: 0.5 }
    ]
  }
};

function getCountryProfile(country) {
  return geoPoliticalMap[country] || null;
}

module.exports = {
  geoPoliticalMap,
  getCountryProfile
};
