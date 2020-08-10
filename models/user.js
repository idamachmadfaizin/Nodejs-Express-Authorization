const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 128
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 256
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);