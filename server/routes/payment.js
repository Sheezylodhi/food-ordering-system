const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, orderId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map(item => ({
                price_data: { 
                    currency: 'usd', 
                    product_data: { name: item.name }, 
                    unit_amount: Math.round(item.price * 100) 
                },
                quantity: item.qty,
            })),
            mode: 'payment',
            metadata: { orderId: orderId }, 
            success_url: `http://localhost:5173/success?orderId=${orderId}`,
            cancel_url: `http://localhost:5173/cancel`,
        });

        // Yeh crucial hai: response mein 'url' key honi chahiye
        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Backend Error:", err);
        res.status(500).json({ error: err.message });
    }
});
// routes/payments.js
router.post('/save-order-details', async (req, res) => {
    try {
        const { customerDetails, cart, total, paymentMethod } = req.body;
        
        // Agar user logged in hai to ID lo, warna null chhor do
        // Frontend se 'Authorization' header hatane ke baad ye code aise chalega:
        const newOrder = new Order({ 
            ...customerDetails, 
            email: customerDetails.email.toLowerCase(), // Email lowercase save karo
            cart, 
            total, 
            paymentMethod, 
            paymentStatus: 'Pending',
            status: 'Pending'
            // user field yahan se hata di hai, ye manual link ho jayega
        });
        
        await newOrder.save();
        res.json({ orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment Successful hone par
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        // Database mein Order update karo
        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'Paid' });
        console.log(`Order ${orderId} marked as Paid!`);
    }

    res.json({ received: true });
});

router.get('/:orderId', authMiddleware, async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
});

module.exports = router;