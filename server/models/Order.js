const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    name: String,
    email: String,
    phone: String,
    address: String,
    cart: Array,
    total: Number,
    paymentMethod: { type: String, enum: ['Online', 'COD'], required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
    // Status ke options update kiye:
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now },
    
},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);