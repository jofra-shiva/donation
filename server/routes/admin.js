const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, updateCampaignStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/campaigns/:id/status', updateCampaignStatus);

module.exports = router;
