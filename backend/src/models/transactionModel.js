const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['income', 'expense'], 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true,
    },
    category: { 
        type: String, 
        required: true,
        trim: true 
    },
    note: { 
        type: String, 
        trim: true 
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
},
{ timestamps: true });

const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;