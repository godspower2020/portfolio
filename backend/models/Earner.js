const mongoose = require('mongoose')

const EarnerSchema = new mongoose.Schema({
    earnerName: {
        type: String,
        required: true
    },
    earnerEmail: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Earner', EarnerSchema)