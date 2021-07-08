const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
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

// capitalize clientName
clientSchema.pre('save', function (next) {
    const words = this.clientName.split(' ')
    this.clientName = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    next()
})

module.exports = mongoose.model('Client', clientSchema)