const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const selfHealing = require('./self_healing');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===== Servir frontend =====
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== Dados iniciais =====
let allData = [
  { entityId:'ORG-001', riskLevel:92, projectedLossUSD:5630400, extremeScenariosCount:7, score:92 },
  { entityId:'ORG-002', riskLevel:65, projectedLossUSD:3978000, extremeScenariosCount:3, score:65 },
  { entityId:'ORG-003', riskLevel:45, projectedLossUSD:1200000, extremeScenariosCount:2, score:45 }
];

// ===== Endpoint para decisões =====
app.get('/api/decisions', async (req,res)=>{
  try {
    // Executar IA Python
    exec('python ia_engine.py', (err, stdout, stderr) => {
      if(err){ console.error('Erro IA:', err); }
      else if(stdout){ 
        const iaData = JSON.parse(stdout);
        allData = iaData; // Atualiza dados com IA
        selfHealing.checkAndFix(allData); // Aplicar autocorreção
      }
      res.json(allData);
    });
  } catch(err){
    console.error(err);
    res.status(500).json({error:'Erro interno'});
  }
});

app.listen(PORT, () => console.log(`SIGOV Backend rodando em http://localhost:${PORT}`));
