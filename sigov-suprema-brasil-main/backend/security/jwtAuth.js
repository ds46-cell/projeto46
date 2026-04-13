const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'SIGOV_ENTERPRISE_SECRET';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'TOKEN_REQUIRED' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, SECRET);
    req.identity = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'INVALID_TOKEN' });
  }
}

function issueToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

module.exports = { authenticate, issueToken };
