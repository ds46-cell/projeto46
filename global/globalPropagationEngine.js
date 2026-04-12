function propagateGlobalImpact(event, countries) {
  return countries.map(c => ({
    country: c,
    impact: "MODERATE"
  }));
}

module.exports = {
  propagateGlobalImpact
};
