const RSVP = require('../models/RSVP');
const User = require('../models/User');

exports.createRsvp = async (req, res) => {
  const { attending, numberOfGuests, message } = req.body;

  try {
    const userId = req.user.id;
    let rsvp = await RSVP.findOne({ userId });

    if (rsvp) {
      // Update existing RSVP
      rsvp.attending = attending;
      rsvp.numberOfGuests = numberOfGuests;
      rsvp.message = message;
      await rsvp.save();
      return res.json(rsvp);
    }

    // Create new RSVP
    rsvp = new RSVP({
      userId,
      attending,
      numberOfGuests,
      message,
    });

    await rsvp.save();
    res.json(rsvp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRsvps = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const rsvps = await RSVP.find().populate('userId', ['name', 'email']);
    res.json(rsvps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
