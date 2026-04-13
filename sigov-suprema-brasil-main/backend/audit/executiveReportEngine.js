function generateExecutiveReport(payload) {
  return {
    title: "Sovereign Risk Executive Report",
    generatedAt: new Date().toISOString(),
    summary: payload
  };
}

module.exports = {
  generateExecutiveReport
};
