const VALID_KEYS = new Set([
  'SIGOV-ENTERPRISE-KEY-001'
])

module.exports.authenticate = (req) => {
  const key = req.headers['x-api-key']
  if (!key || !VALID_KEYS.has(key)) {
    throw new Error('UNAUTHORIZED_ACCESS')
  }
}
