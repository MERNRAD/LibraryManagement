const Book = require('../models/book')

const getBook = async (req, res) => {
    const bookId = req.params.id;

    Book.findById(bookId, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            book
        });
    });
}

const getAllBooks = async (req, res) => {
    Book.find({}, (err, books)=>{
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            booksList: books
        });
    })
}

const addBook = async (req, res) => {
    const newBook = req.body

    Book.create(newBook, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newBook: book
        });
    })
}

const updateBook = async (req, res) => {
    const bookId = req.params.id
    const updatedBook = req.body

    Book.findByIdAndUpdate(bookId,updatedBook, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedBook: book
        });
    })
}

const deleteBook = async (req, res) => {
    const bookId = req.params.id

    Book.findByIdAndDelete(bookId, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedBook: book
        });
    })
}

module.exports = {
    getBook,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
}
