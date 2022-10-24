const mongoose = require('mongoose')

const borrowalSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    memberID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    borrowedDate: {
        type: Date,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
})

module.exports = mongoose.model('Borrowal', borrowalSchema)
