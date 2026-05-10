const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation'
    },
    amount: Number,
    currency: {
        type: String,
        default: 'USD'
    },
    paymentMethod: String,
    paymentGateway: String,
    gatewayTransactionId: String,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    rawResponse: Object
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
