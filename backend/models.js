import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
  qrCode: { type: String },
  tableNumber: { type: Number },
  checkedIn: { type: Boolean, default: false },
  checkedInAt: { type: Date }
}, { timestamps: true });

const rsvpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attending: { type: Boolean, required: true },
  numberOfGuests: { type: Number, min: 1, max: 5, default: 1 },
  message: { type: String },
  dietaryRestrictions: { type: String },
  giftContribution: { type: Number, default: 0 }
}, { timestamps: true });

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  tableName: { type: String, required: true },
  capacity: { type: Number, required: true },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const memorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['wish', 'photo', 'video'], required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const RSVP = mongoose.model('RSVP', rsvpSchema);
export const Table = mongoose.model('Table', tableSchema);
export const Memory = mongoose.model('Memory', memorySchema);
