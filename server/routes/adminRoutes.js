const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const MenuItem = require('../models/MenuItem');
const streamifier = require('streamifier'); // npm install streamifier
const Order = require('../models/Order');
const User = require('../models/User');

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer(); // Memory storage

router.post('/add-item', upload.single('image'), async (req, res) => {
    console.log("Body:", req.body); // Check karo kya data aa raha hai
    console.log("File:", req.file);
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });

    // Cloudinary Upload Stream
    const uploadFromBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'amber-oak' }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(req.file);

    const newItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url // Cloudinary se mila URL
    });

    await newItem.save();
    res.status(201).json({ message: "Dish added successfully!", data: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all items
router.get('/menu', async (req, res) => {
    const items = await MenuItem.find();
    res.json(items);
});


// Delete Menu Item
router.delete('/delete-item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found!" });
        }
        
        res.status(200).json({ message: "Item deleted successfully!" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

// Edit Menu Item
router.put('/edit-item/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        
        let updateData = { name, description, price, category };

        // Agar nayi image upload ki hai, toh Cloudinary par update karo
        if (req.file) {
            const uploadFromBuffer = (file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ folder: 'amber-oak' }, (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    });
                    streamifier.createReadStream(file.buffer).pipe(stream);
                });
            };
            const result = await uploadFromBuffer(req.file);
            updateData.image = result.secure_url;
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ message: "Item updated successfully!", data: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Status update
router.patch('/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.json({ message: "Status Updated" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete Order
router.delete('/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        // Har user ke liye count nikaalo
        const usersWithOrderCount = await Promise.all(users.map(async (user) => {
            const orderCount = await Order.countDocuments({ email: user.email });
            return { ...user._doc, orderCount };
        }));
        res.json(usersWithOrderCount);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// User Delete
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
});

router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// 2. User ke orders (Email ke zariye)
router.get('/orders-by-email/:email', async (req, res) => {
    const orders = await Order.find({ email: req.params.email });
    res.json(orders);
});

router.get('/analytics', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
        
        const revenueData = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        const statusCounts = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        res.json({ totalOrders, totalUsers, deliveredOrders, totalRevenue, statusCounts });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/reports', async (req, res) => {
    try {
        const { start, end } = req.query;
        
        // Start date: subah 12:00:00 baje se
        const startDate = new Date(start);
        
        // End date: raat 11:59:59 baje tak
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);

        const orders = await Order.find({
            createdAt: { $gte: startDate, $lte: endDate }
        }).populate('user', 'name email');

        res.json(orders);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

module.exports = router;