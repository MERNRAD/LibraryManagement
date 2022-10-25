// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
} = require('../controllers/BorrowalController')

router.get("/getAll", (req, res) => getAllBorrowals(req,res))

router.get("/get/:id", (req, res) => getBorrowal(req, res))

router.post("/add", (req, res) => addBorrowal(req, res))

router.put("/update/:id", (req, res) => updateBorrowal(req, res))

router.delete("/delete/:id", (req, res) => deleteBorrowal(req, res))

module.exports = router;
