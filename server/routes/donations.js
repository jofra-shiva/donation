const express = require('express');
const router = express.Router();
const { donate, getUserDonations } = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, donate);
router.get('/my', protect, getUserDonations);

module.exports = router;
