const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.patch('/:id/status', bookingController.updateBookingStatus);
router.get('/expert/:expertId', bookingController.getExpertBookings);

module.exports = router;
