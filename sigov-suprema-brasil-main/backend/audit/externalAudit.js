const crypto = require('crypto');

module.exports = function audit(data) {
  return {
    timestamp: Date.now(),
    hash: crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')
  };
};
