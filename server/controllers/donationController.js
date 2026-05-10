const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.donate = async (req, res, next) => {
    try {
        const { campaignId, amount, message, isAnonymous, paymentMethod } = req.body;

        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        // Create Donation Record (Initial Status Pending)
        const donation = await Donation.create({
            user: req.user._id,
            campaign: campaignId,
            amount,
            message,
            isAnonymous,
            paymentStatus: 'completed' // Simulating immediate completion for now
        });

        // Create Transaction Record
        await Transaction.create({
            user: req.user._id,
            donation: donation._id,
            amount,
            paymentMethod,
            status: 'success'
        });

        // Update Campaign
        campaign.raisedAmount += amount;
        campaign.donorCount += 1;
        campaign.donors.push({
            user: req.user._id,
            amount,
            date: Date.now()
        });
        await campaign.save();

        // Update User
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { totalDonated: amount },
            $push: { donationHistory: donation._id }
        });

        res.status(201).json({
            success: true,
            donation
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ user: req.user._id })
            .populate('campaign', 'title images');
        
        res.json({
            success: true,
            donations
        });
    } catch (error) {
        next(error);
    }
};
