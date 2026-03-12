const mongoose = require('mongoose');

const Rsvpschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    default: 1,
  },
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('RSVP', Rsvpschema);
