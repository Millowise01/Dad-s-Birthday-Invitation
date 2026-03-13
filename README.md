# 60th Birthday Celebration Platform

A modern, elegant web application for managing birthday celebration invitations, RSVPs, and guest management.

## 🎉 Features

### Guest Features
- ✅ User registration and authentication
- ✅ RSVP confirmation with guest count
- ✅ Personal QR code for event check-in
- ✅ Downloadable digital invitation
- ✅ Memory wall for birthday wishes
- ✅ Optional gift contribution tracking
- ✅ Dietary restrictions submission
- ✅ Real-time countdown to event

### Admin Features
- ✅ Complete guest list management
- ✅ RSVP statistics dashboard
- ✅ Table assignment system
- ✅ QR code check-in system
- ✅ Gift contribution tracking
- ✅ Guest message moderation
- ✅ Export guest list capability

### Design Features
- ✅ Elegant gold and black theme
- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ Confetti celebration effects
- ✅ Google Maps integration
- ✅ Mobile-first approach

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Axios
- React Icons
- Canvas Confetti
- CSS3 with animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- QRCode generation
- Nodemailer (email support)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Dad-s-Birthday-Invitation
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/birthday-celebration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
ADMIN_EMAIL=admin@birthday.com
ADMIN_PASSWORD=Admin@123
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
Update `MONGODB_URI` in backend `.env` with your Atlas connection string.

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 👤 Default Admin Credentials

```
Email: admin@birthday.com
Password: Admin@123
```

**⚠️ IMPORTANT: Change these credentials in production!**

## 📁 Project Structure

```
Dad-s-Birthday-Invitation/
├── backend/
│   ├── models.js          # MongoDB schemas
│   ├── server.js          # Express server & API routes
│   ├── package.json
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styles
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .env
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new guest
- `POST /api/auth/signin` - Login

### RSVP
- `POST /api/rsvp` - Submit/update RSVP
- `GET /api/rsvp/me` - Get user's RSVP

### Guest
- `GET /api/guests/me` - Get current user data

### Admin (Protected)
- `GET /api/admin/guests` - Get all guests
- `GET /api/admin/stats` - Get statistics
- `DELETE /api/admin/guests/:id` - Delete guest
- `PUT /api/admin/guests/:id/table` - Assign table
- `POST /api/admin/checkin` - Check-in guest

### Memory Wall
- `POST /api/memories` - Post memory/wish
- `GET /api/memories` - Get approved memories
- `PUT /api/admin/memories/:id/approve` - Approve memory (admin)

### Tables
- `GET /api/tables` - Get all tables (admin)
- `POST /api/tables` - Create table (admin)

## 🎨 Customization

### Event Details
Edit `frontend/src/App.jsx`:
```javascript
// Line ~100
const eventDate = new Date('2025-06-15T18:00:00');

// Event details section
Date: Saturday, June 15, 2025
Time: 6:00 PM - 11:00 PM
Venue: Grand Celebration Hall
```

### Colors & Theme
Edit `frontend/src/App.css`:
```css
:root {
  --gold: #d4af37;
  --dark-gold: #b8941f;
  --black: #1a1a1a;
  /* Modify these colors */
}
```

### Add Father's Photo
Replace the placeholder in `App.jsx`:
```jsx
<div className="image-placeholder">
  {/* Replace with: */}
  <img src="/path-to-photo.jpg" alt="Dad" />
</div>
```

### Google Maps
Update the iframe src in `App.jsx` with your venue coordinates.

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on Render.com or Railway.app
2. **Connect repository**
3. **Set environment variables** from `.env`
4. **Deploy** from `backend` directory
5. **Note the deployed URL**

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Update environment variable:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

4. **Redeploy:**
```bash
vercel --prod
```

### MongoDB Atlas Setup

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`
5. Whitelist deployment IP addresses

## 📧 Email Configuration (Optional)

For automatic email confirmations:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate App Password
   - Update `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. **Other providers:** Update SMTP settings accordingly

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Set secure CORS origins
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Rate limit API endpoints
- [ ] Sanitize user inputs

## 🎯 Extra Features to Add

### QR Check-In System
Guests scan QR code at entrance for automatic check-in.

### Email Notifications
Automatic confirmation emails with event details.

### Photo Gallery
Upload and share event photos.

### Live Slideshow
Display memories during the event.

### Gift Registry
Track group gift contributions.

### Seating Chart
Visual table assignment interface.

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env
```

### CORS Errors
Update backend `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

## 📱 Mobile Responsiveness

The application is fully responsive and tested on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

## 🤝 Support

For questions or issues:
- Email: contact@celebration.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is created for personal use. Modify as needed.

## 🎊 Credits

Built with ❤️ for an unforgettable 60th birthday celebration.

---

**Happy Birthday! 🎂🎉**
