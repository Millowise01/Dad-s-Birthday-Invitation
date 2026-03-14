# ✅ Setup & Launch Checklist

Use this checklist to ensure everything is configured correctly before launching.

## 📋 Pre-Launch Checklist

### 1. Installation ✓
- [ ] Node.js installed (v18+)
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)

### 2. Backend Configuration ✓
- [ ] `backend/.env` file created
- [ ] MongoDB connection string configured
- [ ] JWT_SECRET changed (min 32 characters)
- [ ] Admin email updated
- [ ] Admin password changed (strong password)
- [ ] Email settings configured (optional)
- [ ] FRONTEND_URL set correctly

### 3. Frontend Configuration ✓
- [ ] `frontend/.env` file created
- [ ] VITE_API_URL points to backend
- [ ] Can access frontend on localhost:5173

### 4. Event Customization ✓
- [ ] Event date updated (3 places in App.jsx)
- [ ] Event time updated
- [ ] Venue name updated
- [ ] Venue address updated
- [ ] Google Maps location updated
- [ ] Hero title customized
- [ ] Hero subtitle customized
- [ ] About section text personalized

### 5. Visual Customization ✓
- [ ] Father's photo added (or placeholder kept)
- [ ] Color theme chosen (optional)
- [ ] Contact information updated in footer
- [ ] Copyright year updated

### 6. Testing - Guest Flow ✓
- [ ] Can access website
- [ ] Can sign up as guest
- [ ] Receive QR code after signup
- [ ] Can submit RSVP
- [ ] Confetti animation works
- [ ] Can update RSVP
- [ ] Can post birthday wish
- [ ] Can download QR code
- [ ] Mobile responsive works

### 7. Testing - Admin Flow ✓
- [ ] Can login as admin
- [ ] Dashboard shows statistics
- [ ] Can view guest list
- [ ] Can see RSVP details
- [ ] Can assign tables
- [ ] Can approve memories
- [ ] Can delete guests (if needed)

### 8. Network Access ✓
- [ ] Backend CORS configured
- [ ] Can access from phone (same WiFi)
- [ ] Can access from tablet (same WiFi)
- [ ] Network URLs work correctly

### 9. Security ✓
- [ ] Admin password is strong
- [ ] JWT_SECRET is unique and long
- [ ] .env files not committed to git
- [ ] Default credentials changed

### 10. Performance ✓
- [ ] Page loads quickly
- [ ] Images optimized
- [ ] No console errors
- [ ] Animations smooth
- [ ] Forms submit correctly

---

## 🚀 Launch Day Checklist

### Before Event
- [ ] All guests invited
- [ ] RSVP deadline communicated
- [ ] Tables assigned (if using table system)
- [ ] QR scanner ready (phone/tablet)
- [ ] Backup guest list printed
- [ ] Admin credentials accessible
- [ ] Device charged for check-in

### During Event
- [ ] Check-in station set up
- [ ] QR scanner working
- [ ] Memory wall displayed (optional)
- [ ] Track attendance
- [ ] Monitor gift contributions

### After Event
- [ ] Export guest list
- [ ] Backup database
- [ ] Thank guests
- [ ] Share photos (optional)
- [ ] Keep as memory archive

---

## 🔍 Quick Test Script

Run through this in 5 minutes:

### Test 1: Guest Registration
1. Open http://localhost:5173
2. Click "RSVP Now"
3. Sign up with test email
4. Verify QR code appears
5. ✓ Success if you see dashboard

### Test 2: RSVP Submission
1. Fill out RSVP form
2. Select "Yes, I'll be there"
3. Choose number of guests
4. Add message
5. Submit
6. ✓ Success if confetti appears

### Test 3: Memory Wall
1. Scroll to Memory Wall
2. Post a test wish
3. ✓ Success if "submitted for approval" message shows

### Test 4: Admin Access
1. Logout
2. Login with admin credentials
3. ✓ Success if you see statistics dashboard

### Test 5: Admin Functions
1. View guest list
2. Check statistics
3. ✓ Success if test guest appears in list

### Test 6: Mobile Access
1. Find your IP: `ipconfig`
2. Open on phone: `http://YOUR_IP:5173`
3. Test sign up flow
4. ✓ Success if everything works on mobile

---

## 📊 Pre-Launch Metrics

Track these before going live:

| Metric | Target | Actual |
|--------|--------|--------|
| Page load time | < 3 seconds | ___ |
| Mobile responsive | 100% | ___ |
| Test signups | 3+ | ___ |
| Test RSVPs | 3+ | ___ |
| Admin functions | All working | ___ |
| Network access | Working | ___ |

---

## 🎯 Common Pre-Launch Issues

### Issue: Can't access on mobile
**Fix:** Update CORS in `backend/server.js` (already done!)

### Issue: QR code not showing
**Fix:** Check backend logs, ensure QRCode package installed

### Issue: Confetti not working
**Fix:** Check browser console, ensure canvas-confetti installed

### Issue: Admin can't login
**Fix:** Check admin credentials in `backend/.env`

### Issue: Database connection fails
**Fix:** Ensure MongoDB running or Atlas connection string correct

---

## 📱 Device Testing Checklist

Test on these devices before launch:

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari (Mac)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iPhone)
- [ ] Tablet (iPad/Android)
- [ ] Different screen sizes

---

## 🎨 Visual Quality Checklist

- [ ] All text readable
- [ ] Colors contrast well
- [ ] Images not pixelated
- [ ] Buttons easy to click
- [ ] Forms easy to fill
- [ ] No layout breaks
- [ ] Animations smooth
- [ ] Loading states clear

---

## 🔒 Security Checklist

- [ ] Strong admin password
- [ ] Unique JWT secret
- [ ] HTTPS in production
- [ ] No credentials in code
- [ ] .env files in .gitignore
- [ ] CORS properly configured
- [ ] Input validation working
- [ ] SQL injection protected (NoSQL)

---

## 📈 Capacity Planning

Estimate your needs:

| Guests | Database | Backend | Frontend |
|--------|----------|---------|----------|
| < 50 | Free tier OK | Free tier OK | Free tier OK |
| 50-200 | Free tier OK | Consider paid | Free tier OK |
| 200+ | Paid tier | Paid tier | Free tier OK |

**Current Setup (Free Tier):**
- MongoDB Atlas: 512 MB (good for 500+ guests)
- Render: 750 hours/month (sleeps after 15 min)
- Vercel: 100 GB bandwidth/month

---

## 🎊 Final Pre-Launch Steps

1. **Backup everything:**
   ```bash
   git add .
   git commit -m "Pre-launch backup"
   git push
   ```

2. **Test one more time:**
   - Complete guest flow
   - Complete admin flow
   - Test on mobile

3. **Prepare launch message:**
   ```
   🎉 You're invited to celebrate [Name]'s 60th Birthday!
   
   RSVP here: http://192.168.0.100:5173
   (or your deployed URL)
   
   Please confirm by [date]
   ```

4. **Monitor after launch:**
   - Check for errors
   - Monitor RSVPs
   - Respond to questions
   - Track attendance

---

## ✨ You're Ready to Launch!

Once all checkboxes are ✓, you're ready to share with guests!

**Launch Command:**
```bash
# Double-click START.bat
# Or run manually:
cd backend && npm start
cd frontend && npm run dev -- --host
```

**Share this URL with guests:**
```
http://192.168.0.100:5173
```

**Or deploy to production and share:**
```
https://your-app.vercel.app
```

---

## 🆘 Emergency Contacts

Keep these handy during the event:

- **Tech Support:** [Your contact]
- **Venue Contact:** [Venue phone]
- **Backup Plan:** Printed guest list

---

## 📝 Post-Launch Notes

After the event, document:
- Total guests registered: ___
- Total RSVPs confirmed: ___
- Total checked in: ___
- Issues encountered: ___
- Improvements for next time: ___

---

**Good luck with your celebration! 🎂🎉**
