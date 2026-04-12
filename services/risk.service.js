// services/risk.service.js

export function calculateRisk(decision) {
    // Exemplo simplificado: risco é 10% do valor
    const risk_before = decision.value ? decision.value * 0.1 : 0;
    const risk_after = 0; // risco evitado pelo SIGOV
    return { risk_before, risk_after };
}
