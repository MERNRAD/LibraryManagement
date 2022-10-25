// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genreController')

router.get("/getAll", (req, res) => getAllGenres(req,res))   

router.get("/get/:id", (req, res) => getGenre(req, res))

router.post("/add", (req, res) => addGenre(req, res))

router.put("/update/:id", (req, res) => updateGenre(req, res))

router.delete("/delete/:id", (req, res) => deleteGenre(req, res))

module.exports = router;
