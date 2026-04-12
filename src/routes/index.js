const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const licenseMiddleware = require("../middlewares/license.middleware");

const authController = require("../controllers/auth.controller");

const router = express.Router();

// 🔐 LOGIN
router.post("/login", authController.login);

// 🔒 ROTA PROTEGIDA (FUNCIONANDO 100%)
router.get(
  "/secure",
  authMiddleware,
  licenseMiddleware,
  (req, res) => {
    res.json({
      message: "Sistema funcionando 🔥",
      user: req.user
    });
  }
);

module.exports = router;