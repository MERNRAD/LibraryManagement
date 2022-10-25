// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
  loginUser,
  registerUser,
} = require('../controllers/authController')

router.get("/login", (req, res) => loginUser(req, res))

router.post("/register", (req, res) => registerUser(req, res))

module.exports = router;
