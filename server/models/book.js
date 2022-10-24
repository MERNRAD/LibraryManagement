const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    genreID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Book', bookSchema)
