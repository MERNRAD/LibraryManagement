// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getMember,
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
} = require('../controllers/bookController')

router.get("/getAll", (req, res) => getAllMembers(req,res))   

router.get("/get/:id", (req, res) => getMember(req, res))

router.post("/add", (req, res) => addMember(req, res))

router.put("/update/:id", (req, res) => updateMember(req, res))

router.put("/delete/:id", (req, res) => deleteMember(req, res))

module.exports = router;
