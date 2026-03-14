# 🎉 Getting Started - Simple Guide

The easiest way to get your Birthday Celebration Platform running!

---

## 🚀 Super Quick Start (Windows)

### Method 1: Double-Click to Start (Easiest!)

1. **Double-click** `START.bat` in the project folder
2. **Wait** for two windows to open (Backend & Frontend)
3. **Open browser** to http://localhost:5173
4. **Done!** 🎉

### Method 2: Manual Start

**Terminal 1 (Backend):**
```bash
cd C:\Dad-s-Birthday-Invitation\backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd C:\Dad-s-Birthday-Invitation\frontend
npm run dev -- --host
```

---

## 🛑 How to Stop

### Method 1: Double-Click to Stop
1. **Double-click** `STOP.bat`
2. **Done!**

### Method 2: Manual Stop
Press `Ctrl + C` in both terminal windows

---

## 🌐 Access URLs

| Device | URL |
|--------|-----|
| Your Computer | http://localhost:5173 |
| Your Phone | http://192.168.0.100:5173 |
| Other Devices | http://192.168.0.100:5173 |

*(Make sure devices are on same WiFi)*

---

## 🔐 Login Credentials

### Admin Account
```
Email: admin@birthday.com
Password: Admin@123
```

### Guest Account
Click "RSVP Now" to create a new account

---

## 📝 What to Customize

### Must Change:
1. **Event Date** - Update in `frontend/src/App.jsx`
2. **Event Time** - Update in `frontend/src/App.jsx`
3. **Venue** - Update in `frontend/src/App.jsx`
4. **Admin Password** - Update in `backend/.env`

### Should Change:
5. **Hero Title** - "60 Years of Grace"
6. **About Text** - Story about celebrant
7. **Contact Info** - Footer contact details
8. **Google Maps** - Your venue location

### Nice to Have:
9. **Father's Photo** - Add to `frontend/public/`
10. **Colors** - Change in `frontend/src/App.css`

**See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions**

---

## ✅ Quick Test

1. ✓ Visit http://localhost:5173
2. ✓ Click "RSVP Now"
3. ✓ Sign up with test email
4. ✓ Submit RSVP (see confetti!)
5. ✓ Logout
6. ✓ Login as admin
7. ✓ See your test guest in dashboard

---

## 🎯 Common Tasks

### Add a Guest (as Admin)
Guests self-register, but you can:
1. Login as admin
2. View guest list
3. Assign tables
4. Track RSVPs

### Check RSVPs
1. Login as admin
2. Dashboard shows statistics
3. Guest list shows all details

### Approve Birthday Wishes
1. Login as admin
2. Scroll to Memory Wall section
3. Approve submitted wishes

### Export Guest List
1. Login as admin
2. View guest list
3. Copy/screenshot for records

---

## 📱 Share with Guests

### On Same WiFi:
```
Hey! RSVP for the party here:
http://192.168.0.100:5173
```

### After Deploying Online:
```
Hey! RSVP for the party here:
https://your-app.vercel.app
```

---

## 🐛 Something Not Working?

### Backend won't start
```bash
# Check if MongoDB is running
# Or use MongoDB Atlas (cloud)
```

### Frontend won't start
```bash
# Make sure backend is running first
# Check if port 5173 is free
```

### Can't login as admin
```bash
# Check backend/.env file
# Verify admin credentials
```

### Can't access on phone
```bash
# Make sure on same WiFi
# Check CORS settings (already configured!)
```

**See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help**

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **GETTING_STARTED.md** | This file - quick start |
| **CUSTOMIZATION.md** | How to customize everything |
| **CHECKLIST.md** | Pre-launch checklist |
| **QUICKSTART.md** | Detailed setup guide |
| **DEPLOYMENT.md** | Deploy to production |
| **API.md** | API documentation |
| **TROUBLESHOOTING.md** | Fix common issues |
| **README.md** | Complete overview |

---

## 🎨 Customization Priority

### Priority 1 (Must Do):
- [ ] Event date & time
- [ ] Venue details
- [ ] Admin password

### Priority 2 (Should Do):
- [ ] Hero title & subtitle
- [ ] About section text
- [ ] Contact information
- [ ] Google Maps location

### Priority 3 (Nice to Have):
- [ ] Father's photo
- [ ] Color theme
- [ ] Custom messages

---

## 🚀 Deployment (Optional)

When ready to go online:

1. **Database:** MongoDB Atlas (free)
2. **Backend:** Render.com (free)
3. **Frontend:** Vercel (free)

**Total Cost:** $0/month

**See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step guide**

---

## 💡 Pro Tips

1. **Test First:** Create test accounts before sharing
2. **Mobile First:** Most guests will use phones
3. **Backup Data:** Export guest list regularly
4. **Monitor RSVPs:** Check dashboard daily
5. **Have Backup:** Print guest list for event day

---

## 🎊 You're Ready!

1. ✓ Servers running
2. ✓ Customization done
3. ✓ Testing complete
4. ✓ Ready to share!

**Share the invitation and start collecting RSVPs! 🎉**

---

## 🆘 Need Help?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check [CUSTOMIZATION.md](CUSTOMIZATION.md)
3. Check browser console (F12)
4. Check backend terminal for errors

---

## 📞 Quick Reference

**Start:** Double-click `START.bat`
**Stop:** Double-click `STOP.bat`
**Access:** http://localhost:5173
**Admin:** admin@birthday.com / Admin@123
**Customize:** See CUSTOMIZATION.md
**Deploy:** See DEPLOYMENT.md
**Help:** See TROUBLESHOOTING.md

---

**Happy Celebrating! 🎂🎉**
