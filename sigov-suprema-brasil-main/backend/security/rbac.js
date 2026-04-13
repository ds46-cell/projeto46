function requireRole(roles = []) {
  return (req, res, next) => {
    const role = req.identity?.role;
    if (!roles.includes(role)) {
      return res.status(403).json({ error: 'INSUFFICIENT_ROLE' });
    }
    next();
  };
}

module.exports = { requireRole };
