const express = require("express");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(express.json());

// 🔗 ROTAS PRINCIPAIS
app.use("/api", routes);

// 💣 TESTE FORÇADO (PRIORIDADE MÁXIMA)
app.get("/api/secure", (req, res) => {
  res.json({
    FORCA_BRUTA: "APP.JS 🔥"
  });
});

module.exports = app;