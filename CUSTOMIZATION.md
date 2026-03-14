# 🎨 Customization Guide

Quick reference for customizing your Birthday Celebration Platform.

## 📝 What to Update

### 1. Event Date & Time ⏰

**File:** `frontend/src/App.jsx`

**Line ~100:** Update the countdown date
```javascript
const eventDate = new Date('2025-12-31T18:00:00'); // Change this
```

**Line ~200:** Update displayed date in Hero section
```jsx
<div className="hero-date">December 31, 2025</div>
```

**Line ~250:** Update Event Details section
```jsx
<p>Saturday, December 31, 2025</p>  // Change date
<p>6:00 PM - 11:00 PM</p>           // Change time
```

---

### 2. Event Title & Message 🎉

**File:** `frontend/src/App.jsx`

**Hero Section (Line ~190):**
```jsx
<h1 className="hero-title">60 Years of Grace</h1>
<p className="hero-subtitle">Celebrating a Life Well Lived</p>
```

Change to your custom message:
```jsx
<h1 className="hero-title">Dad's 60th Birthday</h1>
<p className="hero-subtitle">Join us for an unforgettable celebration</p>
```

---

### 3. Venue Information 📍

**File:** `frontend/src/App.jsx`

**Event Details Section (Line ~260):**
```jsx
<p>Grand Celebration Hall</p>
<p className="venue-address">123 Memory Lane, City</p>
```

Update with your actual venue:
```jsx
<p>Your Venue Name</p>
<p className="venue-address">Full Address, City, State ZIP</p>
```

---

### 4. Google Maps Location 🗺️

**File:** `frontend/src/App.jsx`

**Steps:**
1. Go to https://www.google.com/maps
2. Search for your venue
3. Click "Share" button
4. Click "Embed a map"
5. Copy the iframe code
6. Replace the iframe in `App.jsx` (Line ~270)

**Current:**
```jsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
  ...
></iframe>
```

**Replace with your embed code**

---

### 5. Add Father's Photo 📸

**Option A: Simple Method**

1. Place photo in `frontend/public/` folder
2. Name it `dad-photo.jpg`
3. Edit `frontend/src/App.jsx` (Line ~230)

**Find:**
```jsx
<div className="image-placeholder">
  <FaHeart size={60} />
  <p>Add Dad's Photo Here</p>
</div>
```

**Replace with:**
```jsx
<img 
  src="/dad-photo.jpg" 
  alt="Dad" 
  style={{
    width: '100%', 
    maxWidth: '400px', 
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  }} 
/>
```

**Option B: Multiple Photos**
```jsx
<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
  <img src="/dad-photo1.jpg" alt="Dad" style={{width: '100%', borderRadius: '10px'}} />
  <img src="/dad-photo2.jpg" alt="Dad" style={{width: '100%', borderRadius: '10px'}} />
</div>
```

---

### 6. About Section Text 📖

**File:** `frontend/src/App.jsx` (Line ~240)

**Current:**
```jsx
<p>
  For 60 years, he has been a pillar of strength, wisdom, and love. 
  A devoted father, loving husband, and cherished friend to many.
</p>
<p>
  Join us as we celebrate this milestone with stories, laughter, 
  and gratitude for all the beautiful memories we've shared.
</p>
```

**Customize with your own message:**
```jsx
<p>
  Your custom message about the celebrant...
</p>
<p>
  More details about the celebration...
</p>
```

---

### 7. Admin Credentials 🔐

**File:** `backend/.env`

**Change these BEFORE going live:**
```env
ADMIN_EMAIL=admin@birthday.com          # Change to your email
ADMIN_PASSWORD=Admin@123                # Change to strong password
```

**After changing:**
1. Stop backend (Ctrl+C)
2. Delete old admin from database (or drop database)
3. Restart backend - new admin will be created

---

### 8. Contact Information 📞

**File:** `frontend/src/App.jsx` (Footer section, Line ~450)

**Current:**
```jsx
<p>For inquiries: contact@celebration.com | +1 (555) 123-4567</p>
```

**Update with your contact:**
```jsx
<p>For inquiries: yourname@email.com | +1 (234) 567-8900</p>
```

---

### 9. Color Theme 🎨

**File:** `frontend/src/App.css`

**Line ~10:**
```css
:root {
  --gold: #d4af37;        /* Primary gold color */
  --dark-gold: #b8941f;   /* Darker gold for hover */
  --black: #1a1a1a;       /* Background black */
  --white: #ffffff;
  --gray: #f5f5f5;
  --dark-gray: #333;
}
```

**Popular Color Schemes:**

**Royal Blue & Gold:**
```css
:root {
  --gold: #d4af37;
  --dark-gold: #b8941f;
  --black: #1a237e;       /* Royal blue */
  --white: #ffffff;
  --gray: #e8eaf6;
  --dark-gray: #283593;
}
```

**Burgundy & Gold:**
```css
:root {
  --gold: #d4af37;
  --dark-gold: #b8941f;
  --black: #4a0e0e;       /* Burgundy */
  --white: #ffffff;
  --gray: #f5f5f5;
  --dark-gray: #6d1414;
}
```

**Emerald & Gold:**
```css
:root {
  --gold: #d4af37;
  --dark-gold: #b8941f;
  --black: #064e3b;       /* Emerald */
  --white: #ffffff;
  --gray: #f0fdf4;
  --dark-gray: #065f46;
}
```

---

### 10. Database Connection 💾

**File:** `backend/.env`

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/birthday-celebration
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/birthday-celebration?retryWrites=true&w=majority
```

**Get MongoDB Atlas connection string:**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Database → Connect → Connect your application
4. Copy connection string
5. Replace `<password>` with your actual password

---

### 11. Email Notifications 📧

**File:** `backend/.env`

**For Gmail:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Get Gmail App Password:**
1. Google Account → Security
2. Enable 2-Step Verification
3. App Passwords → Generate
4. Copy 16-character password
5. Paste in EMAIL_PASS

**For Other Email Providers:**

**Outlook:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

---

### 12. Network Access 🌐

**File:** `backend/server.js` (Already updated!)

**Current configuration allows:**
- localhost:5173
- 192.168.0.100:5173
- 172.30.16.1:5173
- 172.31.176.1:5173

**To add more IPs:**
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.100:5173',
  'http://YOUR_NEW_IP:5173',  // Add here
  process.env.FRONTEND_URL
].filter(Boolean);
```

---

## 🚀 Quick Customization Checklist

Before sharing with guests:

- [ ] Update event date (3 places in App.jsx)
- [ ] Update event time
- [ ] Update venue name and address
- [ ] Add Google Maps location
- [ ] Add father's photo
- [ ] Customize about section text
- [ ] Update hero title and subtitle
- [ ] Change admin email and password
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Test RSVP flow
- [ ] Test admin dashboard

---

## 🎯 Testing After Customization

1. **Restart both servers:**
   ```bash
   # Backend
   Ctrl+C
   npm start
   
   # Frontend
   Ctrl+C
   npm run dev
   ```

2. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Or hard refresh: Ctrl+Shift+R

3. **Test all features:**
   - Sign up as guest
   - Submit RSVP
   - View QR code
   - Post memory
   - Login as admin
   - View dashboard

---

## 💡 Pro Tips

### Tip 1: Keep Original Files
Before making changes, copy the original:
```bash
cp frontend/src/App.jsx frontend/src/App.jsx.backup
```

### Tip 2: Test Incrementally
Make one change at a time and test immediately.

### Tip 3: Use Version Control
```bash
git add .
git commit -m "Updated event details"
```

### Tip 4: Mobile First
Always test on mobile after making changes.

### Tip 5: Backup Database
Export guest data regularly:
```bash
mongodump --uri="mongodb://localhost:27017/birthday-celebration" --out=./backup
```

---

## 🆘 Need Help?

- **Syntax errors:** Check browser console (F12)
- **Backend errors:** Check terminal running backend
- **Styling issues:** Check App.css
- **Can't find file:** Use VS Code search (Ctrl+Shift+F)

---

## 📚 File Reference

| What to Change | File Location |
|----------------|---------------|
| Event date/time | `frontend/src/App.jsx` |
| Venue details | `frontend/src/App.jsx` |
| Colors | `frontend/src/App.css` |
| Admin credentials | `backend/.env` |
| Database | `backend/.env` |
| Email settings | `backend/.env` |
| API URL | `frontend/.env` |
| Network access | `backend/server.js` |

---

**Happy Customizing! 🎉**

Make it your own and create an unforgettable celebration! 🎂
