const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true,
        trim: true 
    },
    category: { 
        type: String, 
        required: true,
        trim: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const expenseModel = mongoose.model('Expense', expenseSchema);

module.exports = expenseModel;