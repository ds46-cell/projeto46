const { validateLicense } = require("../services/license.service");

module.exports = (req, res, next) => {
  const license = req.headers["x-license"];

  if (!license || !validateLicense(license)) {
    return res.status(403).json({ error: "Licença inválida" });
  }

  next();
};