function propagateImpact(originCountry, sector) {
  const map = {
    Germany: ["France", "Italy", "Netherlands"],
    Brazil: ["Argentina", "Uruguay"]
  };

  return map[originCountry] || [];
}

module.exports = { propagateImpact };
