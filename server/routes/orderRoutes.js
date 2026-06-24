const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');

// PayHere ke liye Hash Generate karna (Secure)
router.post('/create-order', async (req, res) => {
    const { items, total, email } = req.body;
    
    // Yahan order save karo status 'Pending' ke saath
    const newOrder = new Order({ items, total, customerEmail: email });
    await newOrder.save();

    // PayHere Hash Logic (MD5)
    const merchantSecret = process.env.PAYHERE_SECRET;
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const orderId = newOrder._id.toString();
    const currency = 'LKR'; // Tumhare currency ke hisaab se
    
    const hash = crypto.createHash('md5')
        .update(merchantId + orderId + parseFloat(total).toFixed(2) + currency + crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase())
        .digest('hex').toUpperCase();

    res.json({ orderId, hash });
});

router.get('/:orderId', authMiddleware, async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
});

module.exports = router;