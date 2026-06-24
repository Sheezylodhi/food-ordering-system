const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Apne model ka sahi path dena

const createAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/food-order'); // Yahan apna URL daalo

        const email = "muhammadshahzaiblodhi@gmail.com";
        const password = "zaib@123";

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log("Admin pehle se exist karta hai!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            name: "Admin",
            email: email,
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Admin successfully create ho gaya!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();