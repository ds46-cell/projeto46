module.exports = {
  getCountriesBySector(sector) {
    if (sector === "Energy") {
      return ["France", "Netherlands", "Poland", "Austria"];
    }
    return [];
  }
};
