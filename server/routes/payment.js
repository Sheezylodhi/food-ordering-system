const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');



// Webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await Order.findByIdAndUpdate(session.metadata.orderId, { paymentStatus: 'Paid' });
    }
    res.json({ received: true });
});

router.use(express.json());

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, orderId } = req.body;
        // Use environment variable for Frontend URL
        const domain = process.env.CLIENT_URL || 'http://localhost:5173';

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
            success_url: `${domain}/success?orderId=${orderId}`,
            cancel_url: `${domain}/cancel`,
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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


module.exports = router;