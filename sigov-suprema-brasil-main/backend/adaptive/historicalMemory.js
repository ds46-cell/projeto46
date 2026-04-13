const memory = [];

function recordDecision(decision) {
  memory.push(decision);
}

function getSimilarCases(context) {
  return memory.slice(-3);
}

module.exports = {
  recordDecision,
  getSimilarCases
};
