import fetch from 'node-fetch';

const base = 'http://localhost:3000/decision';

async function run() {
  const create = await fetch(`${base}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Decisão Estratégica de Crédito',
      owner: 'Conselho Diretor'
    })
  }).then(r => r.json());

  const analyze = await fetch(`${base}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      decisionId: create.id,
      riskScore: 7.6,
      actor: 'Analista'
    })
  }).then(r => r.json());

  await fetch(`${base}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      decisionId: create.id,
      actor: 'Diretor'
    })
  });

  await fetch(`${base}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      decisionId: create.id,
      actor: 'Secretaria'
    })
  });

  console.log('✅ Fluxo completo executado');
}

run();
