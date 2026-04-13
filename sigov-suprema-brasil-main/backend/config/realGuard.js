module.exports = function assertRealEnvironment() {
  const required = [
    "SIGOV_MODE",
    "SIGOV_SOVEREIGN_ID",
    "SIGOV_INSTITUTION_KEY"
  ];

  required.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`SIGOV REAL MODE BLOCKED: missing ${key}`);
    }
  });

  if (process.env.SIGOV_MODE !== "REAL") {
    throw new Error("SIGOV not running in REAL mode.");
  }
};
