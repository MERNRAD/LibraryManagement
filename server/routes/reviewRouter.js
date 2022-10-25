// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getReview,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')

router.get("/getAll", (req, res) => getAllReviews(req,res))   

router.get("/get/:id", (req, res) => getReview(req, res))

router.post("/add", (req, res) => addReview(req, res))

router.put("/update/:id", (req, res) => updateReview(req, res))

router.delete("/delete/:id", (req, res) => deleteReview(req, res))

module.exports = router;
