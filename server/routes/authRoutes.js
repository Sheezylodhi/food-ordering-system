const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const authMiddleware = require('../middleware/auth');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("941489352984-rk9c2fk78oqec67gj4n9ggi4ltcsfmkd.apps.googleusercontent.com");

const nodemailer = require('nodemailer');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check karo kya user pehle se hai?
        let user = await User.findOne({ email });

        if (user) {
            // Agar user hai par verified nahi, toh update karo
            user.otp = otp;
            user.password = hashedPassword; // Password update
            await user.save();
        } else {
            // Naya user banao
            user = new User({ name, email, password: hashedPassword, otp, isVerified: false });
            await user.save();
        }

        await transporter.sendMail({
    from: '"My Shop" <muhammadshahzaiblodhi@gmail.com>',
    to: email,
    subject: "Verify your Account",
    html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #ea580c;">Welcome to My Shop!</h2>
            <p>Please use the verification code below to complete your registration:</p>
            <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 10px;">
                ${otp}
            </div>
            <p style="color: #666; font-size: 12px;">This code expires in 10 minutes.</p>
        </div>`
});

        res.status(201).json({ message: "OTP sent to your email!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// OTP Verify Route
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Lowercase email for consistency
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) return res.status(400).json({ error: "User not found" });

        // Dono ko string mein convert kar ke compare karo
        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        
        user.isVerified = true;
        user.otp = null; 
        await user.save();
        
        res.json({ message: "Account Verified Successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // --- YEH HAI WOH SYNC LOGIC ---
        // Login hote hi us email ke saare unassigned orders ko is user se link karo
        await Order.updateMany(
            { email: email.toLowerCase(), user: { $exists: false } }, 
            { $set: { user: user._id } }
        );
        // ------------------------------

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/google-login', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({ 
            idToken: token, 
            audience: "941489352984-rk9c2fk78oqec67gj4n9ggi4ltcsfmkd.apps.googleusercontent.com" 
        });
        const { name, email } = ticket.getPayload();
        
        // 1. Check if user exists
        let user = await User.findOne({ email });
        
        // 2. Agar user nahi hai, toh register kar do
        if (!user) {
            user = await User.create({ name, email, password: "google-login-placeholder" });
        }
        
        // 3. JWT Token generate karo
        const jwtToken = jwt.sign({ id: user._id, role: user.role }, "your_secret_key", { expiresIn: '1h' });
        
        res.json({ token: jwtToken, message: "Google Login successful" });
    } catch (error) {
        console.log(error); // Terminal mein error dekho
        res.status(500).json({ error: "Google Auth Failed" });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // req.user.id token se milti hai
        const user = await User.findById(req.user.id).select('-password');
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        
        res.json({ user, orders });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
module.exports = router;


