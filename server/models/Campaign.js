const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Campaign title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Medical', 'Education', 'Disaster Relief', 'Food Support', 'Animal Rescue', 'Other']
    },
    goalAmount: {
        type: Number,
        required: [true, 'Goal amount is required']
    },
    raisedAmount: {
        type: Number,
        default: 0
    },
    images: [{
        type: String,
        required: [true, 'At least one image is required']
    }],
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'paused', 'pending'],
        default: 'pending'
    },
    donors: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    donorCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
