# 🔧 Troubleshooting Guide

Common issues and their solutions for the Birthday Celebration Platform.

---

## 🚨 Installation Issues

### Problem: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
```bash
# Solution 1: Clear cache
npm cache clean --force
npm install

# Solution 2: Use legacy peer deps
npm install --legacy-peer-deps

# Solution 3: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 4: Update npm
npm install -g npm@latest
```

---

### Problem: MongoDB connection fails

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

**Windows:**
```bash
# Check if MongoDB is running
net start MongoDB

# If not installed, download from:
# https://www.mongodb.com/try/download/community

# Or use MongoDB Atlas (cloud)
```

**Mac:**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Check status
brew services list
```

**Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

**Alternative: Use MongoDB Atlas**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/birthday
```

---

### Problem: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use npx
npx kill-port 5000
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or use npx
npx kill-port 5000
```

**Change Port:**
Edit `backend/.env`:
```env
PORT=5001
```

---

## 🔐 Authentication Issues

### Problem: "Please authenticate" error

**Symptoms:**
```json
{
  "error": "Please authenticate"
}
```

**Solutions:**

1. **Check if token exists:**
```javascript
// In browser console
localStorage.getItem('token')
```

2. **Token expired - Sign in again:**
```javascript
// Clear old token
localStorage.removeItem('token')
// Sign in again
```

3. **Check Authorization header:**
```javascript
// Should be:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Verify JWT_SECRET matches:**
```bash
# Backend .env must have same JWT_SECRET
# Don't change it after users sign up
```

---

### Problem: Can't login as admin

**Symptoms:**
- Invalid credentials error
- Admin not found

**Solutions:**

1. **Check admin credentials in `.env`:**
```env
ADMIN_EMAIL=admin@birthday.com
ADMIN_PASSWORD=Admin@123
```

2. **Delete and recreate admin:**
```bash
# Connect to MongoDB
mongosh

# Use database
use birthday-celebration

# Delete admin
db.users.deleteOne({ role: 'admin' })

# Restart backend (auto-creates admin)
npm start
```

3. **Verify admin exists:**
```bash
mongosh
use birthday-celebration
db.users.findOne({ role: 'admin' })
```

---

## 🌐 CORS Issues

### Problem: CORS policy error

**Symptoms:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

1. **Update backend CORS:**
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

2. **For production:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

3. **Allow multiple origins:**
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

---

## 📡 API Connection Issues

### Problem: Frontend can't connect to backend

**Symptoms:**
- Network errors
- API calls fail
- "Failed to fetch"

**Solutions:**

1. **Check backend is running:**
```bash
# Should see: Server running on port 5000
cd backend
npm start
```

2. **Verify API URL:**
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

3. **Test backend directly:**
```bash
curl http://localhost:5000/api/memories
```

4. **Check browser console:**
```javascript
// Should show correct URL
console.log(import.meta.env.VITE_API_URL)
```

5. **Restart frontend after .env change:**
```bash
# Stop frontend (Ctrl+C)
# Start again
npm run dev
```

---

## 🎨 Frontend Issues

### Problem: Blank white screen

**Symptoms:**
- Nothing displays
- Console shows errors

**Solutions:**

1. **Check console for errors:**
```
Press F12 → Console tab
```

2. **Common fixes:**
```bash
# Clear cache
Ctrl+Shift+Delete (Chrome)
Cmd+Shift+Delete (Mac)

# Hard refresh
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

3. **Check if React is loaded:**
```javascript
// In console
window.React
```

---

### Problem: Styles not loading

**Symptoms:**
- Unstyled content
- No colors/layout

**Solutions:**

1. **Check CSS import:**
```javascript
// App.jsx should have:
import './App.css'
```

2. **Verify CSS file exists:**
```bash
ls frontend/src/App.css
```

3. **Clear Vite cache:**
```bash
rm -rf frontend/node_modules/.vite
npm run dev
```

---

### Problem: Confetti not working

**Symptoms:**
- No animation on RSVP
- Console errors

**Solutions:**

1. **Install package:**
```bash
cd frontend
npm install canvas-confetti
```

2. **Check import:**
```javascript
import confetti from 'canvas-confetti';
```

3. **Test manually:**
```javascript
// In browser console
confetti()
```

---

## 💾 Database Issues

### Problem: Data not saving

**Symptoms:**
- RSVP submits but doesn't persist
- Guest list empty

**Solutions:**

1. **Check MongoDB connection:**
```bash
# Backend logs should show:
MongoDB Connected
```

2. **Verify database name:**
```env
# .env
MONGODB_URI=mongodb://localhost:27017/birthday-celebration
#                                      ^^^^ database name
```

3. **Check data in MongoDB:**
```bash
mongosh
use birthday-celebration
db.users.find()
db.rsvps.find()
```

4. **Check for validation errors:**
```bash
# Backend logs will show validation errors
```

---

### Problem: Duplicate key error

**Symptoms:**
```
E11000 duplicate key error collection
```

**Solutions:**

1. **Email already exists:**
```bash
# User trying to sign up with existing email
# Solution: Use different email or sign in
```

2. **Clear test data:**
```bash
mongosh
use birthday-celebration
db.users.deleteMany({ email: 'test@example.com' })
```

---

## 🔍 QR Code Issues

### Problem: QR code not generating

**Symptoms:**
- No QR code in dashboard
- QR code shows as undefined

**Solutions:**

1. **Install QR package:**
```bash
cd backend
npm install qrcode
```

2. **Check import:**
```javascript
// server.js
import QRCode from 'qrcode';
```

3. **Verify QR generation:**
```javascript
// In signup route
const qrCode = await QRCode.toDataURL(qrData);
console.log('QR Code generated:', qrCode ? 'Yes' : 'No');
```

4. **Test QR generation:**
```javascript
// Test file
import QRCode from 'qrcode';
const qr = await QRCode.toDataURL('test');
console.log(qr);
```

---

### Problem: QR code won't download

**Symptoms:**
- Download button doesn't work
- No file downloads

**Solutions:**

1. **Check download function:**
```javascript
const downloadQR = () => {
  const link = document.createElement('a');
  link.href = user.qrCode;
  link.download = 'invitation-qr.png';
  link.click();
};
```

2. **Verify QR code format:**
```javascript
// Should start with: data:image/png;base64,
console.log(user.qrCode.substring(0, 30));
```

3. **Browser permissions:**
```
Check if browser blocks downloads
Settings → Privacy → Downloads
```

---

## 🚀 Deployment Issues

### Problem: Vercel build fails

**Symptoms:**
```
Error: Build failed
```

**Solutions:**

1. **Check build locally:**
```bash
cd frontend
npm run build
```

2. **Fix build errors:**
```bash
# Common issues:
# - Unused variables
# - Missing dependencies
# - Environment variables
```

3. **Add environment variables in Vercel:**
```
Dashboard → Settings → Environment Variables
Add: VITE_API_URL
```

4. **Check build logs:**
```
Vercel Dashboard → Deployments → View Logs
```

---

### Problem: Render deployment fails

**Symptoms:**
- Build succeeds but app crashes
- Health check fails

**Solutions:**

1. **Check logs:**
```
Render Dashboard → Logs
```

2. **Verify environment variables:**
```
Settings → Environment
Check all variables are set
```

3. **Check start command:**
```
Build Command: npm install
Start Command: npm start
```

4. **Verify Node version:**
```json
// package.json
"engines": {
  "node": ">=18.0.0"
}
```

---

### Problem: MongoDB Atlas connection fails

**Symptoms:**
```
MongoServerError: bad auth
```

**Solutions:**

1. **Check connection string:**
```env
# Replace <password> with actual password
MONGODB_URI=mongodb+srv://user:PASSWORD@cluster.mongodb.net/dbname
```

2. **Verify IP whitelist:**
```
Atlas → Network Access → Add IP Address
Add: 0.0.0.0/0 (allow all)
```

3. **Check database user:**
```
Atlas → Database Access
Verify user exists and has read/write permissions
```

4. **Test connection:**
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

---

## 📱 Mobile Issues

### Problem: Layout broken on mobile

**Symptoms:**
- Text too small
- Elements overflow
- Buttons not clickable

**Solutions:**

1. **Check viewport meta tag:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. **Test responsive design:**
```
Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
```

3. **Check media queries:**
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

4. **Fix common issues:**
```css
/* Prevent horizontal scroll */
body {
  overflow-x: hidden;
}

/* Make images responsive */
img {
  max-width: 100%;
  height: auto;
}

/* Fix button sizes */
button {
  min-height: 44px; /* Touch target size */
}
```

---

## 🎯 Performance Issues

### Problem: Slow loading

**Symptoms:**
- Long wait times
- Laggy animations

**Solutions:**

1. **Optimize images:**
```bash
# Compress images before uploading
# Use WebP format
# Lazy load images
```

2. **Enable compression:**
```javascript
// backend/server.js
import compression from 'compression';
app.use(compression());
```

3. **Add caching:**
```javascript
// Cache static assets
app.use(express.static('public', {
  maxAge: '1d'
}));
```

4. **Check network tab:**
```
F12 → Network → Check slow requests
```

---

### Problem: Backend sleeps (Render free tier)

**Symptoms:**
- First request takes 30+ seconds
- "Service unavailable" initially

**Solutions:**

1. **Keep backend awake:**
```bash
# Use UptimeRobot to ping every 5 minutes
# URL: https://your-backend.onrender.com/api/memories
```

2. **Upgrade to paid plan:**
```
Render: $7/month for always-on
```

3. **Show loading state:**
```javascript
// Add loading indicator for first request
const [loading, setLoading] = useState(true);
```

---

## 🔒 Security Issues

### Problem: JWT token exposed

**Symptoms:**
- Token visible in URL
- Token in console logs

**Solutions:**

1. **Store in localStorage only:**
```javascript
// Good
localStorage.setItem('token', token);

// Bad
console.log('Token:', token); // Remove this
```

2. **Use httpOnly cookies (advanced):**
```javascript
// Backend
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

3. **Don't commit .env:**
```bash
# .gitignore should have:
.env
.env.local
.env.production
```

---

## 📧 Email Issues

### Problem: Emails not sending

**Symptoms:**
- No confirmation emails
- SMTP errors

**Solutions:**

1. **Check Gmail App Password:**
```env
# Use App Password, not regular password
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

2. **Enable 2FA and generate App Password:**
```
Google Account → Security → 2-Step Verification → App Passwords
```

3. **Test email configuration:**
```javascript
// Test file
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
await transporter.verify();
console.log('Email config valid');
```

---

## 🆘 Emergency Fixes

### Nuclear Option: Complete Reset

If nothing works:

```bash
# 1. Stop all servers
# Ctrl+C in all terminals

# 2. Delete everything
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# 3. Clear MongoDB
mongosh
use birthday-celebration
db.dropDatabase()

# 4. Reinstall
cd backend
npm install
cd ../frontend
npm install

# 5. Recreate .env files
cp .env.example .env
# Edit .env with your values

# 6. Start fresh
cd backend
npm start
# New terminal
cd frontend
npm run dev
```

---

## 📞 Getting Help

### Before asking for help:

1. **Check error messages carefully**
2. **Search error on Google/Stack Overflow**
3. **Check browser console (F12)**
4. **Check backend logs**
5. **Verify environment variables**
6. **Try on different browser**

### When asking for help, provide:

- Error message (full text)
- What you were trying to do
- What you expected to happen
- What actually happened
- Your environment (OS, Node version, etc.)
- Steps to reproduce

### Useful commands for debugging:

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# Check running processes
# Windows
netstat -ano | findstr :5000
# Mac/Linux
lsof -i :5000

# View backend logs
cd backend
npm start
# Watch for errors

# View frontend logs
cd frontend
npm run dev
# Check browser console
```

---

## ✅ Prevention Checklist

Avoid issues by:

- [ ] Keep dependencies updated
- [ ] Use version control (Git)
- [ ] Test before deploying
- [ ] Backup database regularly
- [ ] Monitor error logs
- [ ] Use environment variables
- [ ] Don't commit secrets
- [ ] Test on multiple devices
- [ ] Have rollback plan
- [ ] Document changes

---

**Still stuck? Check the other documentation files or create an issue on GitHub!**
