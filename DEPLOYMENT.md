# Production Deployment Guide

Complete guide to deploy your Birthday Celebration platform to production.

## 🎯 Deployment Architecture

```
Frontend (Vercel) → Backend (Render) → Database (MongoDB Atlas)
```

---

## 📦 Pre-Deployment Checklist

- [ ] Test application locally
- [ ] Update event details (date, time, venue)
- [ ] Add father's photo
- [ ] Change admin credentials
- [ ] Update Google Maps location
- [ ] Test on mobile devices
- [ ] Prepare custom domain (optional)

---

## 1️⃣ MongoDB Atlas Setup (Database)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Choose "Shared" (Free tier)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (FREE)
3. Select region closest to your users
4. Name cluster: `birthday-celebration`
5. Click "Create"

### Step 3: Create Database User
1. Security → Database Access
2. Add New Database User
3. Username: `birthdayAdmin`
4. Password: Generate secure password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Add User

### Step 4: Configure Network Access
1. Security → Network Access
2. Add IP Address
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### Step 5: Get Connection String
1. Database → Connect
2. Choose "Connect your application"
3. Copy connection string:
```
mongodb+srv://birthdayAdmin:<password>@birthday-celebration.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
4. Replace `<password>` with your actual password
5. Save this for backend deployment

---

## 2️⃣ Backend Deployment (Render)

### Step 1: Prepare Code
1. Push code to GitHub:
```bash
cd Dad-s-Birthday-Invitation
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/birthday-celebration.git
git push -u origin main
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access repositories

### Step 3: Create Web Service
1. Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Name:** `birthday-backend`
   - **Region:** Choose closest to users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 4: Add Environment Variables
Click "Advanced" → Add Environment Variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://birthdayAdmin:YOUR_PASSWORD@birthday-celebration.xxxxx.mongodb.net/birthday-celebration?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecureAdminPassword123!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://your-app.vercel.app
```

**Important:**
- Generate strong JWT_SECRET (32+ characters)
- Change admin credentials
- Use Gmail App Password (not regular password)

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://birthday-backend.onrender.com`

### Step 6: Test Backend
```bash
curl https://birthday-backend.onrender.com/api/admin/stats
```

---

## 3️⃣ Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Update Environment Variable
Edit `frontend/.env`:
```env
VITE_API_URL=https://birthday-backend.onrender.com/api
```

### Step 4: Deploy
```bash
cd frontend
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `birthday-celebration`
- Directory? `./`
- Override settings? **N**

### Step 5: Production Deployment
```bash
vercel --prod
```

### Step 6: Note Your URL
Your app is live at: `https://birthday-celebration.vercel.app`

### Step 7: Update Backend CORS
Update `FRONTEND_URL` in Render environment variables:
```env
FRONTEND_URL=https://birthday-celebration.vercel.app
```

Then update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

Commit and push to trigger redeploy.

---

## 4️⃣ Custom Domain Setup (Optional)

### For Frontend (Vercel)
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `birthday.yourdomain.com`
3. Add DNS records at your domain provider:
   - Type: `CNAME`
   - Name: `birthday`
   - Value: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

### For Backend (Render)
1. Render Dashboard → Your Service → Settings → Custom Domain
2. Add domain: `api.yourdomain.com`
3. Add DNS records:
   - Type: `CNAME`
   - Name: `api`
   - Value: `birthday-backend.onrender.com`
4. Update frontend `.env`:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## 5️⃣ Email Configuration (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Google Account → Security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Google Account → Security → 2-Step Verification
2. Scroll to "App passwords"
3. Select app: "Mail"
4. Select device: "Other" → "Birthday App"
5. Generate
6. Copy 16-character password

### Step 3: Update Backend Environment
In Render, update:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

---

## 6️⃣ SSL/HTTPS

Both Vercel and Render provide automatic SSL certificates. Your app will be served over HTTPS by default.

---

## 7️⃣ Post-Deployment Testing

### Test Checklist
- [ ] Visit frontend URL
- [ ] Sign up as guest
- [ ] Receive QR code
- [ ] Submit RSVP
- [ ] Login as admin
- [ ] View guest list
- [ ] Check statistics
- [ ] Post memory/wish
- [ ] Test on mobile
- [ ] Test on different browsers

### Admin Login
```
URL: https://your-app.vercel.app
Email: admin@yourdomain.com
Password: YourSecureAdminPassword123!
```

---

## 8️⃣ Monitoring & Maintenance

### Render Monitoring
- Dashboard shows logs, metrics, CPU/memory usage
- Free tier sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds

### Keep Backend Awake (Optional)
Use a service like UptimeRobot to ping your backend every 5 minutes:
```
https://birthday-backend.onrender.com/api/memories
```

### MongoDB Atlas Monitoring
- Database → Metrics
- Monitor connections, operations, storage

### Vercel Analytics
- Enable Vercel Analytics for visitor insights
- Dashboard → Analytics → Enable

---

## 9️⃣ Backup Strategy

### Database Backup
1. MongoDB Atlas → Clusters → ... → Backup
2. Enable Cloud Backup (free tier: 1 snapshot)
3. Or export manually:
```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

### Code Backup
- Keep GitHub repository updated
- Tag releases:
```bash
git tag -a v1.0 -m "Production release"
git push origin v1.0
```

---

## 🔟 Scaling Considerations

### When to Upgrade

**Free Tier Limits:**
- Render: 750 hours/month, sleeps after inactivity
- MongoDB Atlas: 512 MB storage
- Vercel: 100 GB bandwidth/month

**Upgrade When:**
- More than 100 guests
- Need 24/7 uptime
- Storage exceeds 500 MB
- High traffic expected

**Paid Plans:**
- Render: $7/month (always on)
- MongoDB Atlas: $9/month (2 GB)
- Vercel: Free tier usually sufficient

---

## 🚨 Troubleshooting

### Backend Not Responding
1. Check Render logs: Dashboard → Logs
2. Verify environment variables
3. Check MongoDB connection
4. Restart service: Settings → Manual Deploy

### Frontend Can't Connect to Backend
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify CORS settings in backend
3. Check browser console for errors
4. Test backend directly: `curl https://your-backend.com/api/memories`

### Database Connection Failed
1. Verify MongoDB connection string
2. Check database user credentials
3. Ensure IP whitelist includes 0.0.0.0/0
4. Test connection from Render logs

### QR Codes Not Generating
1. Check backend logs for errors
2. Verify `qrcode` package is installed
3. Test locally first

---

## 📊 Performance Optimization

### Frontend
```javascript
// Add to vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['react-icons']
        }
      }
    }
  }
})
```

### Backend
```javascript
// Add compression
import compression from 'compression';
app.use(compression());

// Add rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

---

## 🔐 Security Hardening

### Backend Security
```javascript
// Add helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// Sanitize inputs
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());

// Validate inputs
import { body, validationResult } from 'express-validator';
```

### Environment Variables
- Never commit `.env` files
- Use strong passwords (20+ characters)
- Rotate JWT secret periodically
- Use different credentials for production

---

## 📱 Mobile App (Future Enhancement)

Consider building mobile apps using:
- React Native (reuse React code)
- Expo (faster development)
- Progressive Web App (PWA)

---

## 🎉 Launch Checklist

- [ ] All features tested
- [ ] Admin account secured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Email notifications working
- [ ] Mobile responsive verified
- [ ] Backup strategy in place
- [ ] Monitoring enabled
- [ ] Share invitation link with guests!

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **React Docs:** https://react.dev

---

## 🎊 You're Live!

Your birthday celebration platform is now live and ready to accept RSVPs!

**Share this link with guests:**
```
https://your-app.vercel.app
```

**Admin access:**
```
https://your-app.vercel.app
Email: admin@yourdomain.com
Password: [Your secure password]
```

---

**Enjoy the celebration! 🎂🎉**
