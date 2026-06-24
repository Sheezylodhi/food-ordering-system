const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  guests: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  specialRequest: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);