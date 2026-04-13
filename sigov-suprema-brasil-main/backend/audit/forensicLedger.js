const crypto = require('crypto')
const db = require('../database/db')

module.exports.logEvent = (event) => {
  const hash = crypto.createHash('sha256').update(event + Date.now()).digest('hex')
  db.run(`INSERT INTO audit_ledger (event, hash) VALUES (?, ?)`, [event, hash])
  return hash
}
