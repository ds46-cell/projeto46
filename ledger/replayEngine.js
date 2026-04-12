const { loadLedger } = require("./immutableLedger");

function replayDecision(index) {
  const ledger = loadLedger();
  const block = ledger.find(b => b.index === index);

  if (!block) {
    throw new Error("Decision not found in ledger");
  }

  return {
    replayedAt: new Date().toISOString(),
    originalDecision: block.data,
    hash: block.hash
  };
}

function replayAll() {
  return loadLedger().map(block => ({
    index: block.index,
    hash: block.hash,
    timestamp: block.timestamp,
    decision: block.data
  }));
}

module.exports = { replayDecision, replayAll };
