// backend/install.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔹 SIGOV-IA – SUPREMA BRASIL | Installation Script 🔹');

// 1️⃣ Criar pastas essenciais
const folders = [
  'core/runtime',
  'core/impact',
  'core/report',
  'contract',
  'audit',
  'risk'
];

folders.forEach(f => {
  if (!fs.existsSync(f)) {
    fs.mkdirSync(f, { recursive: true });
    console.log(`[CREATE] Folder created: ${f}`);
  }
});

// 2️⃣ Instalar dependências npm
console.log('[INSTALL] Installing npm dependencies...');
exec('npm install', (err, stdout, stderr) => {
  if (err) {
    console.error('[ERROR] npm install failed:', err);
    return;
  }
  console.log(stdout);
  console.log('[SUCCESS] Dependencies installed!');

  // 3️⃣ Mensagem final
  console.log('✅ SIGOV-IA Installation Completed!');
  console.log('Run `node test.js --simulation` to test in simulation mode.');
});
