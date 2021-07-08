const mongoose = require('mongoose')

const earnerSchema = new mongoose.Schema({
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

// capitalize earnerName
earnerSchema.pre('save', function (next) {
    const words = this.earnerName.split(' ')
    this.earnerName = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    next()
})

module.exports = mongoose.model('Earner', earnerSchema)