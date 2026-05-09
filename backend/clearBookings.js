require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/Booking');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  try {
    await Booking.deleteMany({});
    console.log('All corrupted bookings deleted');
  } catch (err) {
    console.log('Error:', err.message);
  }
  process.exit(0);
};
run();
