const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    message: String,
    isAnonymous: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    transactionId: String
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
