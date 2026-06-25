const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes Import
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paymentRoutes = require('./routes/payment');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(cors({
    origin: ["https://food-ordering-system-blush-zeta.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// 1. Webhook Route ko sabse pehle rakhein (Raw body chahiye hoti hai)
// Is route ko yahan handle karne se `express.json()` ka asar is par nahi padega.
app.use('/api/payments', paymentRoutes);

// 2. Ab JSON aur URL-encoded parser lagayein (Ye baaki sab routes par apply hoga)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
    res.send("API working perfect!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));