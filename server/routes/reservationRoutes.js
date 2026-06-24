const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
  try {
    const { name, email, guests, date, specialRequest } = req.body;

    // 1. Pehle Database mein save karo
    const newRes = new Reservation({ name, email, guests, date, specialRequest });
    await newRes.save();

    // 2. Email Sending (Alag try-catch mein)
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          // IMPORTANT: Password mein koi space nahi honi chahiye (e.g., ticmftlirjcbwpp)
          pass: process.env.EMAIL_PASS 
        }
      });

      // Admin Mail
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Table Reservation!',
        text: `New reservation from ${name} for ${guests} guests on ${date}.`
      });

      // User Confirmation Mail
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
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
      console.log("Emails sent successfully.");
    } catch (emailErr) {
      // Agar email fail bhi hui, toh server crash nahi hoga
      console.error("Email sending failed, but reservation saved:", emailErr.message);
    }

    res.status(201).json({ message: "Reservation Confirmed! Check your email." });
  } catch (err) {
    console.error("Critical Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;