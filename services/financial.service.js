export function attachFinancial(decision, value) {
  decision.financial_impact = Number(value);

  if (decision.financial_impact <= 0) {
    throw new Error('Valor financeiro inválido');
  }

  return decision;
}
