import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("LICENSE_KEY:", process.env.LICENSE_KEY);
console.log("CLIENT:", process.env.CLIENT_NAME);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// Função para monitorar eventos e registrar logs
async function logEvent(type, details) {
  await supabase.from("system_logs").insert([{ type, details, created_at: new Date() }]);
}

// Função de verificação de licença
async function verificarLicenca() {
  try {
    const res = await fetch("http://localhost:4000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        license_key: process.env.LICENSE_KEY,
        client: process.env.CLIENT_NAME,
        machine_id: process.env.MACHINE_ID || null
      })
    });
    const data = await res.json();
    await logEvent("check_license", data);
    return data.valid;
  } catch (err) {
    await logEvent("error_license_check", { message: err.message });
    return false;
  }
}

// Motor de segurança IA simples
async function securityEngine(clientName) {
  const { data, error } = await supabase
    .from("system_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  let alerts = [];
  if (error) alerts.push("Erro ao consultar logs para segurança");

  // exemplo simples: se mais de 3 tentativas falhas de licença, bloqueia
  const fails = data.filter(e => e.type === "check_license" && !e.details.valid);
  if (fails.length >= 3) {
    alerts.push("Sistema bloqueado por múltiplas tentativas falhas");
    await supabase.from("licenses").update({ status: "blocked" }).eq("license_key", process.env.LICENSE_KEY);
  }
  return alerts;
}

// Rotas de teste
app.get("/api/logs", async (req, res) => {
  const { data, error } = await supabase.from("system_logs").select("*").order("created_at", { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/alerts", async (req, res) => {
  const alerts = await securityEngine(process.env.CLIENT_NAME);
  res.json({ alerts });
});

// Iniciar sistema
async function iniciarSistema() {
  console.log("🔐 Verificando licença no servidor...");
  const licencaValida = await verificarLicenca();
  if (!licencaValida) {
    console.log("🚫 Licença não autorizada pelo servidor.");
    console.log("Sistema bloqueado.");
    process.exit();
  }
  console.log("✅ Licença válida");
  console.log("🚀 Sistema autorizado");
  app.listen(PORT, () => console.log(`🔥 Sistema rodando em http://localhost:${PORT}`));
}

iniciarSistema();