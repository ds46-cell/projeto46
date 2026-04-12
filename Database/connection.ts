import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
  filename: './database/sigov.db',
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("📦 Banco SQLite conectado");

export default db;
