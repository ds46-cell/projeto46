const crypto = require("crypto");

exports.validateLicense = (key) => {
  return key === process.env.LICENSE_KEY;
};