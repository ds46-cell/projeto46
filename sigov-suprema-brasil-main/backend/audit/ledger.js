const crypto = require('crypto')

const ledger = []

function record(decision) {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(decision))
    .digest('hex')

  const entry = {
    ...decision,
    auditTimestamp: Date.now(),
    auditHash: hash
  }

  ledger.push(entry)
  return entry
}

function getAll() {
  return ledger
}

function validate() {
  return ledger.every(entry => {
    const recalculated = crypto
      .createHash('sha256')
      .update(JSON.stringify({
        decisionId: entry.decisionId,
        entityId: entry.entityId,
        action: entry.action,
        score: entry.score,
        reason: entry.reason,
        timestamp: entry.timestamp
      }))
      .digest('hex')

    return recalculated === entry.auditHash
  })
}

module.exports = { record, getAll, validate }
