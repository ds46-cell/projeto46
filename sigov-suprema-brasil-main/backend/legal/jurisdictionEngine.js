function resolveJurisdiction(country, treaties = []) {
  return {
    countryLaw: `${country} Constitutional Law`,
    emergencyPowers: true,
    treatiesApplied: treaties
  };
}

module.exports = { resolveJurisdiction };
