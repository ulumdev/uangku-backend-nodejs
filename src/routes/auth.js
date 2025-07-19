const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Route untuk registrasi
router.post("/register", AuthController.register);
// Route untuk login
router.post("/login", AuthController.login);

// Export router
module.exports = router;
