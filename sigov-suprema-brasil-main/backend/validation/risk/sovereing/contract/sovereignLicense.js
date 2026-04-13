function validateLicense(license) {
  if (!license || license !== "SIGOV_ENTERPRISE") {
    throw new Error("Invalid or missing sovereign license");
  }
  return true;
}

module.exports = { validateLicense };
