// backend/systemMap.js

/**
 * Mapa sistêmico de dependências entre setores
 */
const systemDependencies = {
  financeiro: ["infraestrutura", "energia", "governo"],
  energia: ["industria", "transporte", "governo"],
  infraestrutura: ["financeiro", "industria"],
  governo: ["financeiro", "infraestrutura"],
  industria: ["logistica", "financeiro"],
  logistica: ["industria", "varejo"]
};

/**
 * Propaga risco de um evento para setores dependentes
 */
function propagateRisk(event) {
  const affectedSectors = systemDependencies[event.tipo] || [];

  const propagatedEvents = affectedSectors.map((sector) => {
    return {
      sector,
      source: event.empresa || "UNKNOWN",
      inheritedRisk: event.risk || "UNKNOWN",
      timestamp: new Date().toISOString()
    };
  });

  return propagatedEvents;
}

module.exports = {
  propagateRisk
};
