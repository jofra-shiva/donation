const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalCampaigns = await Campaign.countDocuments();
        const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
        
        const totalRaised = await Campaign.aggregate([
            { $group: { _id: null, total: { $sum: '$raisedAmount' } } }
        ]);

        const donationsByMonth = await Donation.aggregate([
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    amount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalCampaigns,
                activeCampaigns,
                totalRaised: totalRaised[0]?.total || 0,
                donationsByMonth
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

exports.updateCampaignStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        res.json({ success: true, campaign });
    } catch (error) {
        next(error);
    }
};
