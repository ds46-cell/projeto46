const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // 🔥 TROQUEI PRA bcryptjs (resolve erro no Render)
const crypto = require("crypto");

// 🧠 CORE ENGINE
const { analyzeDecision } = require("./core/decisionEngine");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

app.use(cors());
app.use(express.json());

/* ================== RESPONSE PADRÃO ================== */
function success(res, data) {
  return res.json({ success: true, data, error: null });
}

function fail(res, status, message) {
  return res.status(status).json({ success: false, data: null, error: message });
}

/* ================== RATE LIMIT ================== */
const rateLimitMap = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);

  const requests = rateLimitMap.get(ip).filter((t) => now - t < 60000);

  if (requests.length > 60) {
    return fail(res, 429, "Too many requests");
  }

  requests.push(now);
  rateLimitMap.set(ip, requests);

  next();
}

app.use(rateLimit);

/* ================== DB ================== */
let pool;

try {
  if (process.env.DATABASE_URL) {
    const isSupabase = process.env.DATABASE_URL.includes("supabase");

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isSupabase ? { rejectUnauthorized: false } : false,
    });

    console.log("🌐 Usando DATABASE_URL");
  } else {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "sigov",
      password: "1234",
      port: 5432,
    });

    console.log("💻 Usando banco LOCAL");
  }
} catch (err) {
  console.error("Erro ao configurar DB:", err.message);
}

/* ================== INIT DB ================== */
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS organizations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      api_key TEXT UNIQUE NOT NULL,
      plan TEXT DEFAULT 'basic',
      usage_count INTEGER DEFAULT 0
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      org_id INTEGER REFERENCES organizations(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS decisions (
      id SERIAL PRIMARY KEY,
      org_id INTEGER,
      user_id INTEGER,
      title TEXT,
      value NUMERIC,
      criticality NUMERIC,
      risk NUMERIC,
      impact NUMERIC,
      recommendation TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      org_id INTEGER,
      user_id INTEGER,
      action TEXT,
      data JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ DB READY");
}

/* ================== HELPERS ================== */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, org_id: user.org_id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

async function logAction(org_id, user_id, action, data) {
  try {
    await pool.query(
      "INSERT INTO logs (org_id,user_id,action,data) VALUES ($1,$2,$3,$4)",
      [org_id, user_id, action, data]
    );
  } catch (err) {
    console.error("Log error:", err.message);
  }
}

function toNumber(v) {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

/* ================== AUTH ================== */
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error();
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return fail(res, 401, "Unauthorized");
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return fail(res, 403, "Admin only");
  }
  next();
}

/* ================== HEALTH (🔥 ESSENCIAL PRO RENDER) ================== */
app.get("/", (req, res) => {
  return success(res, {
    status: "OK",
    message: "API SIGOV rodando 🚀",
  });
});

/* ================== ORG ================== */
app.post("/v1/org/create", async (req, res) => {
  try {
    if (!req.body.name) return fail(res, 400, "Name required");

    const apiKey = generateApiKey();

    const result = await pool.query(
      "INSERT INTO organizations (name, api_key) VALUES ($1,$2) RETURNING *",
      [req.body.name, apiKey]
    );

    return success(res, result.rows[0]);
  } catch (err) {
    return fail(res, 500, err.message);
  }
});

/* ================== AUTH ================== */
app.post("/v1/auth/register", async (req, res) => {
  try {
    const { email, password, apiKey } = req.body;

    if (!email || !password || !apiKey)
      return fail(res, 400, "Missing fields");

    const org = await pool.query(
      "SELECT * FROM organizations WHERE api_key=$1",
      [apiKey]
    );

    if (!org.rows.length) {
      return fail(res, 401, "Invalid API Key");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await pool.query(
      `INSERT INTO users (email,password,org_id,role)
       VALUES ($1,$2,$3,'admin') RETURNING *`,
      [email, hash, org.rows[0].id]
    );

    const token = generateToken(user.rows[0]);

    return success(res, { token });
  } catch (err) {
    return fail(res, 500, err.message);
  }
});

app.post("/v1/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows.length) {
      return fail(res, 401, "Invalid credentials");
    }

    const valid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!valid) {
      return fail(res, 401, "Invalid credentials");
    }

    const token = generateToken(user.rows[0]);

    return success(res, { token });
  } catch (err) {
    return fail(res, 500, err.message);
  }
});

/* ================== ANALYZE ================== */
app.post("/v1/decision/analyze", auth, async (req, res) => {
  try {
    const { title, value, criticality } = req.body;

    const org = await pool.query(
      "SELECT * FROM organizations WHERE id=$1",
      [req.user.org_id]
    );

    const organization = org.rows[0];

    if (!organization) return fail(res, 404, "Org not found");

    const result = analyzeDecision({
      value: toNumber(value),
      criticality: toNumber(criticality),
    });

    const saved = await pool.query(
      `INSERT INTO decisions 
      (org_id,user_id,title,value,criticality,risk,impact,recommendation)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        req.user.org_id,
        req.user.id,
        title || "Decision",
        value,
        criticality,
        result.risk,
        result.impact,
        result.recommendation,
      ]
    );

    await logAction(
      req.user.org_id,
      req.user.id,
      "ANALYZE",
      saved.rows[0]
    );

    return success(res, saved.rows[0]);
  } catch (err) {
    return fail(res, 500, err.message);
  }
});

/* ================== START ================== */
(async () => {
  try {
    await initDB();
    app.listen(PORT, () =>
      console.log(`🚀 RUNNING ON ${PORT}`)
    );
  } catch (err) {
    console.error("Startup error:", err.message);
  }
})();