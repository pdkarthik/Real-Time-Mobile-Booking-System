const Booking = require('../models/Booking');

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;
    
    if (!expertId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Try to create the booking. If it violates the unique index, it will throw an error
    const booking = new Booking({ expertId, name, email, phone, date, timeSlot, notes });
    await booking.save();

    // Emit event to update slots in real-time
    const io = req.app.get('io');
    io.emit('slotBooked', { expertId, date, timeSlot });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (Double Booking)
      return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
    }
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET /bookings?email=
exports.getBookings = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    const bookings = await Booking.find({ email }).populate('expertId', 'name category avatar').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// PATCH /bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET /bookings/expert/:expertId
exports.getExpertBookings = async (req, res) => {
  try {
    const { expertId } = req.params;
    const { date } = req.query;
    
    const query = { expertId, status: { $ne: 'Completed' } };
    if (date) query.date = date;

    const bookings = await Booking.find(query).select('date timeSlot');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
