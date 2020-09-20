const express = require('express');
const router = express.Router();

const { getMealsData, postMealsData } = require('../controllers/meals')

router.route('/').get(getMealsData).post(postMealsData);

module.exports = router;