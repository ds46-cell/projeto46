// testDb.js
import pool from './db.js';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão OK! Data e hora do servidor PostgreSQL:', res.rows[0]);
  } catch (err) {
    console.error('Erro ao conectar no PostgreSQL:', err);
  } finally {
    pool.end(); // Fecha a conexão após o teste
  }
}

testConnection();
