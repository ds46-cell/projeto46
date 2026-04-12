const { getCountriesBySector } = require("./countryRegistry");
const { getTreatiesBetween } = require("./treatyRegistry");
const { calculateDependencyIndex } = require("./dependencyGraph");

function propagateImpact(origin, sector, systemicIndex) {
  const affectedCountries = getCountriesBySector(sector);

  return affectedCountries.map(country => {
    const dependency = calculateDependencyIndex(origin, country, sector);
    const treaties = getTreatiesBetween(origin, country, sector);

    return {
      country,
      dependencyIndex: dependency,
      propagatedImpact: Math.round(systemicIndex * dependency),
      treaties
    };
  });
}

module.exports = { propagateImpact };
