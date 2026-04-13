CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  authority TEXT NOT NULL,
  domain TEXT NOT NULL,
  payload TEXT NOT NULL,
  risk_score REAL NOT NULL,
  signature TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  authority TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TEXT NOT NULL
);
