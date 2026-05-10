const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res, next) => {
    try {
        const { title, description, category, goalAmount, images, deadline } = req.body;

        const campaign = await Campaign.create({
            title,
            description,
            category,
            goalAmount,
            images,
            deadline,
            createdBy: req.user._id,
            status: req.user.role === 'admin' ? 'active' : 'pending'
        });

        res.status(201).json({
            success: true,
            campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.getCampaigns = async (req, res, next) => {
    try {
        const { category, sort, search } = req.query;
        let query = { status: 'active' };

        if (category) query.category = category;
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        let campaigns = Campaign.find(query);

        if (sort === 'latest') {
            campaigns = campaigns.sort('-createdAt');
        } else if (sort === 'trending') {
            campaigns = campaigns.sort('-donorCount');
        } else {
            campaigns = campaigns.sort('-createdAt');
        }

        const results = await campaigns.populate('createdBy', 'name avatar');

        res.json({
            success: true,
            count: results.length,
            campaigns: results
        });
    } catch (error) {
        next(error);
    }
};

exports.getCampaignById = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('createdBy', 'name avatar')
            .populate('donors.user', 'name avatar');

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        res.json({
            success: true,
            campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCampaign = async (req, res, next) => {
    try {
        let campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        // Check ownership or admin
        if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({
            success: true,
            campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        await campaign.deleteOne();

        res.json({
            success: true,
            message: 'Campaign deleted'
        });
    } catch (error) {
        next(error);
    }
};
