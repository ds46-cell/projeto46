const crypto = require('crypto')
const fs = require('fs')

module.exports.log = (event) => {
  const record = {
    ...event,
    timestamp: Date.now()
  }
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(record))
    .digest('hex')

  fs.appendFileSync('access.log', JSON.stringify({ record, hash }) + '\n')
}
