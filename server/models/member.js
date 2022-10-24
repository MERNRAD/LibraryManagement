const mongoose = require('mongoose')
const memberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    nic: {
        type: Integer,
        required: true
    },
    phone: {
        type: Integer,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Member', memberSchema)
