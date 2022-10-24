const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    star: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: false
    }
   
})

module.exports = mongoose.model('Review', reviewSchema)
