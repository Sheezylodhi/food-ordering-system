const express = require('express');
const router = express.Router();
// Yahan ensure karo tumne wahi transporter import kiya hai jo test-email.js mein chal raha hai
const transporter = require('../config/nodemailer'); 
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
  try {
    const { name, email, guests, date, specialRequest } = req.body;
    
    // 1. Pehle database mein save karo
    const newRes = new Reservation(req.body);
    await newRes.save();

    // 2. Client ko success ka message foran bhejo
    res.status(201).json({ message: "Reservation Confirmed!" });

    // 3. Email ko Fire-and-Forget mode mein chalao (Background)
    // Hum await nahi kar rahe taake API ka response wait na kare
    sendReservationEmails(name, email, guests, date, specialRequest);

  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to process reservation." });
  }
});

// Helper function to keep route clean
async function sendReservationEmails(name, email, guests, date, specialRequest) {
  try {
    // Admin Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Table Reservation!',
      text: `New reservation from ${name} for ${guests} guests on ${date}.`
    });

    // User Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmed',
      html: `<h3>Reservation Confirmed!</h3><p>Dear ${name}, your booking for ${date} is confirmed.</p>`
    });
    
    console.log("Emails sent successfully!");
  } catch (err) {
    console.error("Background Email Error:", err);
  }
}

module.exports = router;