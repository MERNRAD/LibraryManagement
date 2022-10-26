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
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  genreId: {
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
