const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        trim: true 
    },
    limit: { 
        type: Number, 
        required: true,
        min: 1
    },
    month: {
        type: Number,
        requires: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

budgetSchema.index({ userId: 1, category: 1, month: 1, year: 1 }, { unique: true });

const budgetModel = mongoose.model('Budget', budgetSchema);
module.exports = budgetModel;