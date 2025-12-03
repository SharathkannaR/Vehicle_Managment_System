# 🚀 FINAL RUN GUIDE - Royal Enfield Vehicle Service Management System

## ⚡ ABSOLUTE QUICKEST START (Copy & Paste)

**You have 2 options below. Pick ONE.**

---

## OPTION 1: Automated Setup (Easiest - 30 seconds)

### Simply double-click this file:
```
Garage41/setup.bat
```

This will:
1. ✅ Create virtual environment
2. ✅ Install all packages
3. ✅ Run database migrations
4. ✅ Create superuser account
5. ✅ Ask you to enter admin password

Then follow the on-screen instructions.

---

## OPTION 2: Manual Setup (5 minutes)

Open **PowerShell** and run these commands one by one:

```powershell
# Navigate to project
cd e:\FrontEnd\Garage41

# Create virtual environment
python -m venv venv

# Activate (Windows PowerShell)
venv\Scripts\Activate.ps1

# Install packages
pip install -r requirements.txt

# Setup database
python manage.py makemigrations
python manage.py migrate

# Create admin account (follow prompts)
python manage.py createsuperuser
```

---

## 🎬 RUNNING THE APPLICATION

You need **TWO separate terminals/windows** running simultaneously:

### Terminal 1 - Backend Server

```powershell
cd e:\FrontEnd\Garage41
venv\Scripts\Activate.ps1
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

✅ **Keep this running!** Do NOT close this window.

---

### Terminal 2 - Frontend Server

Open a **NEW PowerShell window** and run:

```powershell
cd e:\FrontEnd\Garage41
python -m http.server 5500
```

**Expected Output:**
```
Serving HTTP on 127.0.0.1 port 5500 (http://127.0.0.1:5500/) ...
```

✅ **Keep this running!** Do NOT close this window.

---

## 🌐 OPEN YOUR BROWSER

Visit: **http://127.0.0.1:5500/BikeShowroom.html**

You should see:
- A landing page with bike background
- Three buttons:
  - ✅ User Login
  - ✅ Admin Login  
  - ✅ Register new user

---

## 🧪 QUICK TEST (2 minutes)

### Test 1: Register
1. Click **"Register new user"**
2. Fill form:
   - Username: `testuser`
   - Email: `test@gmail.com`
   - Password: `Test@123`
   - First Name: `John`
   - Phone: `9999999999`
3. Click **Register**
4. ✅ Should redirect to homepage with "Welcome, John"

### Test 2: Book Appointment
1. Click **"Book an Appointment"**
2. Form auto-fills your name/email/phone
3. Fill:
   - Bike Model: `Royal Enfield Bullet`
   - Service Type: `Oil Change`
   - Date: `2025-12-15`
   - Time: `10:00`
4. Click **Submit**
5. ✅ Should show success alert and redirect to homepage

### Test 3: View History
1. Scroll down on homepage
2. ✅ You should see "Your Service History" with your booking

### Test 4: Logout & Admin
1. Click **Logout** (top right)
2. Go back to BikeShowroom.html
3. Click **"Admin Login"**
4. Enter superuser credentials you created
5. ✅ Should show admin dashboard with all bookings

---

## 📋 PAGES AVAILABLE

| Page | URL | What It Does |
|------|-----|------|
| Landing | http://127.0.0.1:5500/BikeShowroom.html | Login/Register buttons |
| Register | http://127.0.0.1:5500/registration.html | Create new account |
| User Login | http://127.0.0.1:5500/user_login.html | Login as user |
| Admin Login | http://127.0.0.1:5500/admin_login.html | Login as admin |
| Home | http://127.0.0.1:5500/homepage.html | Show services & history |
| Booking | http://127.0.0.1:5500/booking.html | Book appointment |
| Admin Dashboard | http://127.0.0.1:5500/admin_homepage.html | View all bookings |
| Django Admin | http://127.0.0.1:8000/admin/ | Manage users & bookings |

---

## 🔧 DATABASE INFO

### MySQL Database
- **Name:** `garage41`
- **Tables:** `garage_app_user`, `garage_app_booking`
- **Tables auto-created** when you run migrations

### Tables Content

**Users Table** - Stores registered users
- Username, Email, Password (hashed), Name, Phone

**Bookings Table** - Stores service bookings
- User ID, Bike Model, Service Type, Date, Time, Status, Notes

---

## 🐛 COMMON ISSUES & FIXES

### "MySQL connection error"
```
Fix: Make sure MySQL is running
Windows: Services → MySQL80 (or MySQL57)
```

### "Port 8000 already in use"
```
Fix: Use different port
python manage.py runserver 8001
Then access: http://127.0.0.1:8001/
```

### "ModuleNotFoundError: No module named 'mysqlclient'"
```
Fix: Run this command
pip install PyMySQL
```

### "CORS error" or "frontend can't reach backend"
```
Fix: Make sure BOTH servers are running:
- Terminal 1: python manage.py runserver
- Terminal 2: python -m http.server 5500
```

### "Login fails"
```
Fix: 
1. Make sure user is registered
2. Check email and password spelling
3. Clear browser cache (Ctrl+Shift+Delete)
```

### "Service history not showing"
```
Fix:
1. Make sure you're logged in (check top-right for Logout button)
2. Have at least one booking created
3. Check browser console (F12 → Console)
```

---

## 🎯 VERIFICATION CHECKLIST

Before considering project complete, verify:

- [ ] MySQL is running
- [ ] Virtual environment created and activated
- [ ] All packages installed (`pip install -r requirements.txt`)
- [ ] Migrations applied (`python manage.py migrate`)
- [ ] Superuser created (`python manage.py createsuperuser`)
- [ ] Backend server running (`python manage.py runserver`)
- [ ] Frontend server running (`python -m http.server 5500`)
- [ ] Can access http://127.0.0.1:5500/BikeShowroom.html
- [ ] Can register a new user
- [ ] Can login and see homepage
- [ ] Can create a booking
- [ ] Booking appears in service history
- [ ] Can logout and login as admin
- [ ] Can access Django admin at http://127.0.0.1:8000/admin/

---

## 📚 DOCUMENTATION FILES

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | Detailed step-by-step guide |
| **README.md** | Full technical documentation |
| **PROJECT_SUMMARY.md** | Complete project overview |
| **This file** | Quick reference |
| **check_install.py** | Verify installation |

---

## 🚨 IMPORTANT NOTES

1. **Keep both terminals open** - Both backend and frontend must keep running
2. **Database migrations** - Run `python manage.py migrate` before first use
3. **Superuser account** - Create this to access admin panel
4. **Token expiry** - Login tokens expire after 30 days
5. **Production** - Change `DEBUG = False` in settings.py before deploying

---

## ❓ NEED HELP?

1. Read **QUICKSTART.md** for detailed walkthrough
2. Read **README.md** for full documentation
3. Run `python check_install.py` to verify everything
4. Check browser console (F12 → Console tab)
5. Check backend terminal for error messages

---

## 🎉 READY TO START?

### Run these 3 commands in order:

```powershell
# Terminal 1 - Backend
cd e:\FrontEnd\Garage41
venv\Scripts\Activate.ps1
python manage.py runserver

# Open new terminal (Terminal 2) - Frontend
cd e:\FrontEnd\Garage41
python -m http.server 5500

# Open browser
http://127.0.0.1:5500/BikeShowroom.html
```

---

**You now have a fully functional Vehicle Service Management System!** 🚀

Start by registering a test user and creating a booking. Everything should work instantly.

**Questions?** Check the documentation files in this folder.

**Happy Coding!** 🏍️⚙️
