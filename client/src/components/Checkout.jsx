import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../context/CartContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const { cart } = useContext(CartContext);
    const [details, setDetails] = useState({ name: '', email: '', phone: '', address: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);

        // 1. Details database mein save karo
        const { data } = await axios.post('http://localhost:5001/api/payment/save-order-details', { 
            customerDetails: details, cart, total 
        });

        // 2. Stripe Session banao (Order ID ke sath)
        const stripe = await stripePromise;
        const session = await axios.post('http://localhost:5001/api/payment/create-checkout-session', { 
            cart, orderId: data.orderId 
        });

        // 3. Redirect to Stripe
        await stripe.redirectToCheckout({ sessionId: session.data.id });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <input required placeholder="Name" className="w-full p-2 border rounded" onChange={(e) => setDetails({...details, name: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={(e) => setDetails({...details, email: e.target.value})} />
            <input required placeholder="Phone" className="w-full p-2 border rounded" onChange={(e) => setDetails({...details, phone: e.target.value})} />
            <textarea required placeholder="Address" className="w-full p-2 border rounded" onChange={(e) => setDetails({...details, address: e.target.value})} />
            <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
                Pay Now Securely
            </button>
        </form>
    );
};
export default CheckoutForm;