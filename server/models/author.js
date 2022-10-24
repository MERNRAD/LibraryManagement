const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Author', authorSchema)
