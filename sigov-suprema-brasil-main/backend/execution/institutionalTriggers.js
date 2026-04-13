function triggerInstitutionalProtocol(decision) {
  return {
    protocol: "STATE_ALERT_ISSUED",
    authority: decision.authority,
    timestamp: new Date().toISOString()
  };
}

module.exports = { triggerInstitutionalProtocol };
