const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Make sure this is a 16-character App Password
  },
  tls: {
    rejectUnauthorized: false // Render ke liye ye kabhi-kabhi zaroori hota hai
  }
});

module.exports = transporter;