const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign } = require('../controllers/campaignController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getCampaigns)
    .post(protect, createCampaign);

router.route('/:id')
    .get(getCampaignById)
    .put(protect, updateCampaign)
    .delete(protect, deleteCampaign);

module.exports = router;
