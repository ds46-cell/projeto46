const crypto = require("crypto");

const registeredSources = [];

function registerSource({ name, authority, publicKey }) {
  registeredSources.push({ name, authority, publicKey });
}

function validateSource(payload, signature, publicKey) {
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(JSON.stringify(payload));
  return verifier.verify(publicKey, signature, "base64");
}

module.exports = {
  registerSource,
  validateSource,
  registeredSources
};
