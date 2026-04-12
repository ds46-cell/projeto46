const { spawn } = require('child_process');
const path = require('path');

async function executeBrain(input) {
  return new Promise((resolve, reject) => {
    const py = spawn('python', [
      path.join(__dirname, 'ai', 'selfHealing.py'),
      JSON.stringify(input)
    ]);

    let dataBuffer = '';
    py.stdout.on('data', (data) => { dataBuffer += data.toString(); });
    py.stderr.on('data', (data) => { console.error(data.toString()); });

    py.on('close', () => {
      try {
        resolve(JSON.parse(dataBuffer));
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = { executeBrain };
