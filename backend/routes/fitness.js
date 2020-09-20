const express = require('express')

const router = express.Router();

const { getFitnessDetails, postFitnessDetails } = require('../controllers/fitness')

router.route('/').get(getFitnessDetails).post(postFitnessDetails);

module.exports = router;