require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/Booking');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  try {
    await Booking.collection.dropIndex('expertId_1_date_1_timeSlot_1');
    console.log('Old index dropped');
  } catch (err) {
    console.log('Index might not exist or error:', err.message);
  }
  process.exit(0);
};
run();
