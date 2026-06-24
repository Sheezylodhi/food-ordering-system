const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
  try {
    const { name, email, guests, date, specialRequest } = req.body;
    const newRes = new Reservation(req.body);
    await newRes.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 1. ADMIN ko mail bhejo (Notification)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Table Reservation!',
      text: `New reservation from ${name} for ${guests} guests on ${date}.`
    });

    // 2. USER ko professional Confirmation mail bhejo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // User ki email
      subject: 'Reservation Confirmed - Thank you for choosing us!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
          <h2 style="color: #d97706;">Reservation Confirmed!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for choosing our restaurant. Your table has been reserved successfully.</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Special Request:</strong> ${specialRequest || 'None'}</p>
          </div>
          <p>We look forward to serving you!</p>
          <br>
          <p>Best Regards,<br>The Restaurant Team</p>
        </div>
      `
    });

    res.status(201).json({ message: "Reservation Confirmed! Check your email." });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


module.exports = router;