
const express = require('express');
const { scheduleInterview, getAvailableSlots } = require('../controllers/interviewController');

const router = express.Router();

router.post('/interviews', scheduleInterview); 
router.get('/available-slots', getAvailableSlots); 

module.exports = router;
