import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import dotenv from 'dotenv';
import { User, RSVP, Table, Memory } from './models.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const adminAuth = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

// Initialize Admin
const initAdmin = async () => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      phone: '0000000000',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created');
  }
};
initAdmin();

// AUTH ROUTES
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const qrData = `GUEST:${email}:${Date.now()}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      qrCode
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role, qrCode } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        qrCode: user.qrCode,
        tableNumber: user.tableNumber 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RSVP ROUTES
app.post('/api/rsvp', auth, async (req, res) => {
  try {
    const { attending, numberOfGuests, message, dietaryRestrictions, giftContribution } = req.body;
    
    let rsvp = await RSVP.findOne({ userId: req.user._id });
    if (rsvp) {
      rsvp.attending = attending;
      rsvp.numberOfGuests = numberOfGuests;
      rsvp.message = message;
      rsvp.dietaryRestrictions = dietaryRestrictions;
      rsvp.giftContribution = giftContribution || 0;
      await rsvp.save();
    } else {
      rsvp = await RSVP.create({
        userId: req.user._id,
        attending,
        numberOfGuests,
        message,
        dietaryRestrictions,
        giftContribution: giftContribution || 0
      });
    }

    res.json({ rsvp, message: 'RSVP saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/rsvp/me', auth, async (req, res) => {
  try {
    const rsvp = await RSVP.findOne({ userId: req.user._id });
    res.json({ rsvp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GUEST ROUTES
app.get('/api/guests/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const rsvp = await RSVP.findOne({ userId: req.user._id });
    res.json({ user, rsvp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ADMIN ROUTES
app.get('/api/admin/guests', adminAuth, async (req, res) => {
  try {
    const guests = await User.find({ role: 'guest' }).select('-password');
    const guestsWithRSVP = await Promise.all(
      guests.map(async (guest) => {
        const rsvp = await RSVP.findOne({ userId: guest._id });
        return { ...guest.toObject(), rsvp };
      })
    );
    res.json({ guests: guestsWithRSVP });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const totalGuests = await User.countDocuments({ role: 'guest' });
    const totalRSVPs = await RSVP.countDocuments();
    const confirmed = await RSVP.countDocuments({ attending: true });
    const declined = await RSVP.countDocuments({ attending: false });
    const pending = totalGuests - totalRSVPs;
    const totalSeats = await RSVP.aggregate([
      { $match: { attending: true } },
      { $group: { _id: null, total: { $sum: '$numberOfGuests' } } }
    ]);
    const giftTotal = await RSVP.aggregate([
      { $group: { _id: null, total: { $sum: '$giftContribution' } } }
    ]);

    res.json({
      totalGuests,
      confirmed,
      declined,
      pending,
      totalSeats: totalSeats[0]?.total || 0,
      giftContribution: giftTotal[0]?.total || 0
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/admin/guests/:id', adminAuth, async (req, res) => {
  try {
    await RSVP.deleteOne({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guest deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/admin/guests/:id/table', adminAuth, async (req, res) => {
  try {
    const { tableNumber } = req.body;
    await User.findByIdAndUpdate(req.params.id, { tableNumber });
    res.json({ message: 'Table assigned' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/admin/checkin', adminAuth, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Guest not found' });
    
    user.checkedIn = true;
    user.checkedInAt = new Date();
    await user.save();
    
    res.json({ message: 'Guest checked in', user: { name: user.name, tableNumber: user.tableNumber } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// TABLE ROUTES
app.get('/api/tables', adminAuth, async (req, res) => {
  try {
    const tables = await Table.find().populate('guests', 'name email');
    res.json({ tables });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/tables', adminAuth, async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json({ table });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// MEMORY WALL ROUTES
app.post('/api/memories', auth, async (req, res) => {
  try {
    const { type, content, mediaUrl } = req.body;
    const memory = await Memory.create({
      userId: req.user._id,
      type,
      content,
      mediaUrl
    });
    res.status(201).json({ memory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find({ approved: true })
      .populate('userId', 'name')
      .sort('-createdAt');
    res.json({ memories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/admin/memories/:id/approve', adminAuth, async (req, res) => {
  try {
    await Memory.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: 'Memory approved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
