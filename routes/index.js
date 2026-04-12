const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const licenseMiddleware = require("../middlewares/license.middleware");

const authController = require("../controllers/auth.controller");
const systemController = require("../controllers/system.controller");

const router = express.Router();

router.post("/login", authController.login);

router.get(
  "/secure",
  authMiddleware,
  licenseMiddleware,
  systemController.secureData
);

module.exports = router;