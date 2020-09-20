const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    finalCalories: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Fitness', fitnessSchema);