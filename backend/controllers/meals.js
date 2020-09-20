const Meals = require('../models/Meals');
const mongoose = require('mongoose');

exports.getMealsData = async (req, res, next) => {
    try {

        const mealDetails = await Meals.find();

        let total = 0;
        mealDetails.forEach((detail) => {
            total += detail.totalCalories;
        })

        return res.status(200).json({
            success: true,
            data: {
                mealDetails,
                total
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })

    }
}

exports.postMealsData = async (req, res, next) => {
    try {
        const newMealDetails = new Meals({
            mealItems: req.body.mealItems,
            totalCalories: req.body.totalCalories
        })
        await newMealDetails.save();
        return res.status(201).json({
            success: true,
            data: newMealDetails
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}