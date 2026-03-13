# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Setup Environment

**Backend (.env):**
```bash
cd backend
copy .env.example .env
```

**Frontend (.env):**
```bash
cd frontend
copy .env.example .env
```

### Step 3: Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (free tier)
# Get connection string from: https://www.mongodb.com/cloud/atlas
```

### Step 4: Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### Step 6: Login as Admin

```
Email: admin@birthday.com
Password: Admin@123
```

## ✅ What You Get

### Guest Experience:
1. Sign up with name, email, phone
2. Receive personal QR code
3. Submit RSVP (attending/not attending)
4. Select number of guests (1-5)
5. Add dietary restrictions
6. Write birthday message
7. Optional gift contribution
8. Download invitation card

### Admin Dashboard:
1. View all registered guests
2. See RSVP statistics
3. Track confirmed/declined/pending
4. Total seat count
5. Gift contribution total
6. Assign tables to guests
7. Check-in guests via QR
8. Manage memory wall posts

## 🎨 Customize Your Event

### 1. Change Event Date & Time
Edit `frontend/src/App.jsx` (line ~100):
```javascript
const eventDate = new Date('2025-06-15T18:00:00');
```

### 2. Update Event Details
Edit `frontend/src/App.jsx` (Event Details section):
```jsx
<p>Saturday, June 15, 2025</p>
<p>6:00 PM - 11:00 PM</p>
<p>Grand Celebration Hall</p>
```

### 3. Add Father's Photo
Replace placeholder in `App.jsx`:
```jsx
// Find: <div className="image-placeholder">
// Add your image:
<img src="/dad-photo.jpg" alt="Dad" style={{width: '100%', borderRadius: '20px'}} />
```

### 4. Update Google Maps
Get embed code from Google Maps and replace iframe src in `App.jsx`

### 5. Change Colors
Edit `frontend/src/App.css`:
```css
:root {
  --gold: #d4af37;      /* Change to your color */
  --black: #1a1a1a;     /* Change to your color */
}
```

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'guest' | 'admin',
  qrCode: String,
  tableNumber: Number,
  checkedIn: Boolean,
  checkedInAt: Date
}
```

### RSVP Collection
```javascript
{
  userId: ObjectId,
  attending: Boolean,
  numberOfGuests: Number (1-5),
  message: String,
  dietaryRestrictions: String,
  giftContribution: Number
}
```

### Memory Collection
```javascript
{
  userId: ObjectId,
  type: 'wish' | 'photo' | 'video',
  content: String,
  mediaUrl: String,
  approved: Boolean
}
```

### Table Collection
```javascript
{
  tableNumber: Number,
  tableName: String,
  capacity: Number,
  guests: [ObjectId]
}
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Kill port (if occupied)
npx kill-port 5000
npx kill-port 5173
```

## 🌐 Production Deployment

### Backend (Render.com - Free)
1. Push code to GitHub
2. Go to render.com
3. New → Web Service
4. Connect repository
5. Root directory: `backend`
6. Build command: `npm install`
7. Start command: `npm start`
8. Add environment variables
9. Deploy

### Frontend (Vercel - Free)
1. Install: `npm i -g vercel`
2. Run: `cd frontend && vercel`
3. Follow prompts
4. Update `VITE_API_URL` to backend URL
5. Redeploy: `vercel --prod`

### Database (MongoDB Atlas - Free)
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in backend

## 📱 Test on Mobile

```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from phone on same network
http://YOUR_IP:5173
```

## 🎉 Features Checklist

- [x] User authentication (JWT)
- [x] RSVP system
- [x] QR code generation
- [x] Admin dashboard
- [x] Guest statistics
- [x] Memory wall
- [x] Gift contribution tracking
- [x] Table assignment
- [x] Countdown timer
- [x] Responsive design
- [x] Confetti animations
- [x] Google Maps integration

## 💡 Pro Tips

1. **Test with multiple accounts** - Create several guest accounts to see how it looks
2. **Mobile first** - Most guests will use phones
3. **Print QR codes** - Have backup printouts at entrance
4. **Backup data** - Export guest list before event
5. **Test check-in** - Practice QR scanning before event day

## 🆘 Need Help?

### MongoDB won't start?
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port already in use?
```bash
# Kill the process
npx kill-port 5000
npx kill-port 5173
```

### Can't connect to backend?
Check `VITE_API_URL` in frontend `.env` matches backend URL

### Forgot admin password?
Delete admin user from MongoDB and restart backend (auto-creates new admin)

---

**You're all set! 🎊 Enjoy the celebration!**
