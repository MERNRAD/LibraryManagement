const Genre = require('../models/genre')

const getGenre = async (req, res) => {
    const genreId = req.params.id;

    Genre.findById(genreId, (err, genre) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            genre
        });
    });
}

const getAllGenres = async (req, res) => {
    Genre.find({}, (err, genres)=>{
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            genresList: genres
        });
    })
}

const addGenre = async (req, res) => {
    const newGenre = req.body

    Genre.create(newGenre, (err, genre) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newGenre: genre
        });
    })
}

const updateGenre = async (req, res) => {
    const genreId = req.params.id
    const updatedGenre = req.body

    Genre.findByIdAndUpdate(genreId,updatedGenre, (err, genre) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedGenre: genre
        });
    })
}

const deleteGenre = async (req, res) => {
    const genreId = req.params.id

    Genre.findByIdAndDelete(genreId, (err, genre) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedGenre: genre
        });
    })
}

module.exports = {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre
}
