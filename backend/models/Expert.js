const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true, default: 0 },
  avatar: { type: String, default: 'https://via.placeholder.com/150' }
});

module.exports = mongoose.model('Expert', expertSchema);
