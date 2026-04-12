function selfHeal(anomalies) {
  anomalies.forEach(a => {
    console.log('[SELF-HEALING] Corrigindo:', a);
  });
}

module.exports = { selfHeal };
