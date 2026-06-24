const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const upload = multer();

// Cloudinary config (Ensure process.env variables are set)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Add Category
router.post('/add', upload.single('icon'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No icon provided" });

        // Cloudinary Upload
        const uploadFromBuffer = (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'categories' }, (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                });
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        };

        const result = await uploadFromBuffer(req.file);

        const newCat = new Category({ 
            name: req.body.name, 
            icon: result.secure_url 
        });
        
        await newCat.save();
        res.status(201).json(newCat);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// Get All Categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Edit Category
router.put('/edit/:id', upload.single('icon'), async (req, res) => {
    try {
        const { name } = req.body;
        let updateData = { name };

        // Agar user ne nayi image (icon) upload ki hai
        if (req.file) {
            // Cloudinary Upload logic
            const uploadFromBuffer = (file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ folder: 'categories' }, (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    });
                    streamifier.createReadStream(file.buffer).pipe(stream);
                });
            };

            const result = await uploadFromBuffer(req.file);
            updateData.icon = result.secure_url; // Nayi image URL update mein daal di
        }

        const updatedCat = await Category.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!updatedCat) return res.status(404).json({ error: "Category not found" });

        res.json({ message: "Category updated successfully!", data: updatedCat });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

module.exports = router;