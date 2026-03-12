const express = require('express');
const router = express.Router();
const { createRsvp, getRsvps } = require('../controllers/rsvpController');
const auth = require('../middleware/auth');

// @route   POST api/rsvp
// @desc    Create or update an RSVP
// @access  Private
router.post('/', auth, createRsvp);

// @route   GET api/rsvp
// @desc    Get all RSVPs (admin only)
// @access  Private
router.get('/', auth, getRsvps);

module.exports = router;
