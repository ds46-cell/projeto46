function validateMandate(context) {
  if (!context || !context.authorityId) {
    throw new Error("Invalid mandate context");
  }
  return true;
}

module.exports = { validateMandate };
