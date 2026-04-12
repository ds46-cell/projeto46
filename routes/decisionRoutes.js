// routes/decisionRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { analyze } = require("../controllers/decisionController");

router.post("/analyze", auth, analyze);

module.exports = router;