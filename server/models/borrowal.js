const mongoose = require('mongoose')

const borrowalSchema = new mongoose.Schema({
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  memberId: {
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
    status: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Borrowal', borrowalSchema)
