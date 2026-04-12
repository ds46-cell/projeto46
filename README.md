# SIGOV-IA – SUPREMA BRASIL

**Sistema Soberano de Decisão Estratégica e Risco Sistêmico**  
Versão: 1.0  
Licenciamento: Institucional / Anual

---

## Visão Geral

O SIGOV-IA é um sistema backend de governança, classificação de risco institucional, auditoria imutável e apoio à decisão estratégica, projetado para **bancos, órgãos governamentais e grandes corporações**.

Ele permite:

- Avaliação de risco sistêmico
- Execução de decisões estratégicas
- Registro completo de auditoria e governança
- Projeção de impacto financeiro
- Operação em **modo LIVE** (real) ou **SIMULATION** (reproduzível)

---

## Arquitetura

- Node.js + Express  
- Modular: core, risk, audit, contract, report  
- Governança: versionamento e hash imutável  
- Prova técnica: geração automática de CSV/PDF

---

## Como Usar

### Executar Teste

```bash
node test.js [--simulation]
