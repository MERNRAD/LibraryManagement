// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/authController')

router.post("/login", (req, res) => loginUser(req, res))

router.post("/register", (req, res) => registerUser(req, res))

router.get("/logout", (req, res) => logoutUser(req, res))

module.exports = router;
