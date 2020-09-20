const Fitness = require('../models/Fitness');
const mongoose = require('mongoose');

exports.getFitnessDetails = async (req, res, next) => {
    try {
        const fitnessDetails = await Fitness.find();

        return res.status(200).json({
            success: true,
            data: fitnessDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.postFitnessDetails = async (req, res, next) => {
    try {
        const newFitnessDetails = new Fitness({
            height: req.body.height,
            weight: req.body.weight,
            finalCalories: req.body.finalCalories,
            age: req.body.age,

        })
        await newFitnessDetails.save();
        return res.status(201).json({
            success: true,
            data: newFitnessDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
        console.log(error)
    }
}