const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    mealItems: {
        type: Array,
        required: true
    },
    totalCalories: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Meals', mealSchema)