import pkg from './config/database.js';
const pool = pkg;

(async () => {
  const res = await pool.query('SELECT NOW()');
  console.log('Banco conectado:', res.rows[0]);
  process.exit();
})();
