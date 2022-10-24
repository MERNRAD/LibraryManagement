const Author = require('../models/author')


//read
const getAuthor = async (req, res) => {
    const authorId = req.params.id;

    Author.findById(authorId, (err, author) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            author
        });
    });
}

const getAllAuthors = async (req, res) => {
    Author.find({}, (err, authors) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            authorsList: authors
        });
    })
}

//create
const addAuthor = async (req, res) => {
    const newAuthor = req.body

    Author.create(newAuthor, (err, author) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newAuthor: author
        });
    })
}

//update
const updateAuthor = async (req, res) => {
    const authorId = req.params.id
    const updatedAuthor = req.body

    Author.findByIdAndUpdate(authorId, updatedAuthor, (err, author) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedAuthor: author
        });
    })
}


//delete
const deleteAuthor = async (req, res) => {
    const authorId = req.params.id

    Author.findByIdAndDelete(authorId, (err, author) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedAuthor: author
        });
    })
}

module.exports = {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
}
