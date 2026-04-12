module.exports = function assertEnvironment() {
  if (!process.env.SIGOV_MODE) {
    console.warn("Running in client mode (no strict validation)");
  }
};