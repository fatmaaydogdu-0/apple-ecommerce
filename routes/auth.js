const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/auth", authController.get_auth);
router.post("/register", authController.post_register);
router.post("/login", authController.post_login);
router.get("/logout", authController.get_logout); 

module.exports = router;