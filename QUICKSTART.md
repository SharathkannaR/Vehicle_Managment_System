# 🚀 COMPLETE SETUP & RUN GUIDE - Royal Enfield Service Management System

## Quick Summary
This is a **complete Vehicle Service Management System** with:
- ✅ Django Backend (Python)
- ✅ MySQL Database
- ✅ Frontend (HTML/CSS/JavaScript)
- ✅ User Registration & Login
- ✅ Booking System
- ✅ Admin Dashboard
- ✅ Service History Tracking

---

## 📋 PRE-REQUISITES

Before starting, ensure you have:

1. **Python 3.8 or higher**
   ```powershell
   python --version
   ```

2. **MySQL Server running**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - On Windows, verify MySQL service is running (Services → MySQL)
   - Verify with: `mysql --version`

3. **Optional: Node.js** (for advanced frontend testing)
   - Download from: https://nodejs.org/

---

## 🔧 STEP-BY-STEP SETUP

### STEP 1️⃣: Create MySQL Database

Open MySQL Command Line or MySQL Workbench and execute:

```sql
-- Create database
CREATE DATABASE garage41 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Create user (if using custom credentials)
CREATE USER 'root'@'localhost' IDENTIFIED BY '';

-- Grant privileges
GRANT ALL PRIVILEGES ON garage41.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

**Note:** If you already have MySQL with root user, just run:
```sql
CREATE DATABASE garage41;
```

---

### STEP 2️⃣: Set Up Python Environment

Open **PowerShell** and navigate to the project folder:

```powershell
# Navigate to project
cd e:\FrontEnd\Garage41

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
venv\Scripts\Activate.ps1

# Or use command prompt (cmd.exe)
venv\Scripts\activate.bat

# Verify venv is active (you should see "(venv)" prefix in terminal)
```

---

### STEP 3️⃣: Install Dependencies

With virtual environment activated:

```powershell
pip install -r requirements.txt
```

This installs:
- Django 4.2.7
- Django REST Framework
- Simple JWT (for authentication)
- mysqlclient (MySQL connector)
- django-cors-headers

**If mysqlclient installation fails:**
```powershell
pip install PyMySQL
# Then skip this step, PyMySQL will work as fallback
```

---

### STEP 4️⃣: Run Database Migrations

Still in the project folder with venv activated:

```powershell
# Create migration files
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

**Expected Output:**
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, garage_app, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  ...
  Applying garage_app.0001_initial... OK
```

If you get MySQL connection error, check:
- MySQL is running
- Database name is correct in `garage41/settings.py`
- MySQL credentials are correct

---

### STEP 5️⃣: Create Admin Account (Superuser)

```powershell
python manage.py createsuperuser
```

Follow the prompts:
```
Username: admin
Email: admin@example.com
Password: (enter a password)
Password (again): (confirm)
```

**Note:** Remember these credentials—you'll need them to login to Django Admin panel.

---

## ▶️ RUNNING THE PROJECT

You need **TWO terminals** running simultaneously:

### Terminal 1 - Start Django Backend

```powershell
# Navigate to project folder
cd e:\FrontEnd\Garage41

# Activate venv if not already active
venv\Scripts\Activate.ps1

# Start backend
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

✅ **Backend is running at:** http://127.0.0.1:8000/

**Keep this terminal open!** The backend must stay running for the frontend to work.

---

### Terminal 2 - Start Frontend Server

Open a **NEW terminal/PowerShell window**:

```powershell
# Navigate to same project folder
cd e:\FrontEnd\Garage41

# Start HTTP server
python -m http.server 5500
```

**Expected Output:**
```
Serving HTTP on 127.0.0.1 port 5500 (http://127.0.0.1:5500/) ...
```

✅ **Frontend is running at:** http://127.0.0.1:5500/

---

## 🌐 ACCESS THE APPLICATION

Open your web browser and visit:

### 🏠 Main Pages

1. **Landing Page (Start here):**
   - URL: http://127.0.0.1:5500/BikeShowroom.html
   - Shows: "User Login", "Admin Login", "Register"

2. **User Registration:**
   - URL: http://127.0.0.1:5500/registration.html
   - Create new user account

3. **User Login:**
   - URL: http://127.0.0.1:5500/user_login.html
   - Login with registered credentials

4. **Admin Login:**
   - URL: http://127.0.0.1:5500/admin_login.html
   - Login as admin (use test credentials)

5. **Home Page (After Login):**
   - URL: http://127.0.0.1:5500/homepage.html
   - Shows: Welcome message, Services, Service History, Logout button

6. **Booking Appointment:**
   - URL: http://127.0.0.1:5500/booking.html
   - Book service appointment (auto-fills user info if logged in)

7. **Admin Dashboard:**
   - URL: http://127.0.0.1:5500/admin_homepage.html
   - View all customer bookings (for admin users)

### 🛠️ Backend Admin Panel

- **Django Admin Panel:** http://127.0.0.1:8000/admin/
- Login with superuser credentials you created in STEP 5
- Manage Users, Bookings, and more

---

## 🧪 TESTING THE SYSTEM

### Test Case 1: Register New User

1. Go to: http://127.0.0.1:5500/registration.html
2. Fill the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@1234`
   - First Name: `John`
   - Phone: `9999999999`
3. Click **Register**
4. ✅ Should redirect to homepage with "Welcome, John" message

### Test Case 2: Book an Appointment

1. (Logged in from Test Case 1) Click **"Book an Appointment"**
2. Form should auto-fill: Name, Email, Phone
3. Fill remaining:
   - Bike Model: `Royal Enfield Bullet`
   - Service Type: `Oil Change`
   - Service Date: `2025-12-15`
   - Time: `10:00 AM`
   - Notes: `Regular maintenance`
4. Click **Submit Booking**
5. ✅ Should show success and redirect to homepage
6. ✅ Booking should appear in "Your Service History" section

### Test Case 3: View Service History

1. On homepage, scroll down to **"Your Service History"**
2. ✅ Should list all bookings created by this user
3. Each booking shows: Date, Service Type, Bike Model, Status

### Test Case 4: Admin Dashboard

1. Go to: http://127.0.0.1:5500/admin_login.html
2. Login with admin account credentials
3. Should redirect to admin_homepage.html
4. ✅ Should display table of ALL bookings from all users

### Test Case 5: Django Admin Panel

1. Go to: http://127.0.0.1:8000/admin/
2. Login with superuser credentials
3. ✅ Can view/edit Users and Bookings
4. Can change booking status from "pending" to "confirmed" or "completed"

---

## 📊 DATABASE TABLES (Auto-created by migrations)

### User Table (`garage_app_user`)
```
id | username | email | password_hash | first_name | last_name | phone | is_staff | created_at
```

### Booking Table (`garage_app_booking`)
```
id | user_id | name | email | phone | bikeModel | serviceType | serviceDate | serviceTime | status | created_at | updated_at
```

View in MySQL:
```powershell
# From MySQL command line
USE garage41;
SELECT * FROM garage_app_user;
SELECT * FROM garage_app_booking;
DESCRIBE garage_app_booking;
```

---

## 🔗 API ENDPOINTS

All backend endpoints are at `http://127.0.0.1:8000/api/`

**Frontend automatically calls these endpoints** (no manual API calls needed), but for testing:

### 1. Register User
```bash
POST /api/register/
Body: {
  "username": "bob",
  "email": "bob@example.com",
  "password": "pass123",
  "first_name": "Bob",
  "phone": "9999"
}
```

### 2. Login
```bash
POST /api/login/
Body: {
  "email": "bob@example.com",
  "password": "pass123"
}
Response: {
  "token": "eyJ0eXAiOiJKV1QiLCJ...",
  "user": {...}
}
```

### 3. Create Booking
```bash
POST /api/bookings/
Headers: Authorization: Bearer <token>
Body: {
  "name": "Bob",
  "email": "bob@example.com",
  "phone": "9999",
  "bikeModel": "Bullet",
  "serviceType": "Oil Change",
  "serviceDate": "2025-12-15",
  "serviceTime": "10:00"
}
```

### 4. Get User History
```bash
GET /api/user/history/
Headers: Authorization: Bearer <token>
```

### 5. Get All Bookings (Admin)
```bash
GET /api/bookings/
Headers: Authorization: Bearer <token>
```

---

## ⚙️ TROUBLESHOOTING

### Problem: "Can't connect to MySQL server"
**Solution:**
1. Verify MySQL is running: `mysql --version`
2. On Windows, check Services → MySQL80 is running
3. Check credentials in `garage41/settings.py` DATABASES section
4. Try connecting manually: `mysql -u root -p`

### Problem: "ModuleNotFoundError: No module named 'mysqlclient'"
**Solution:**
```powershell
pip install PyMySQL
```

### Problem: "Port 8000 already in use"
**Solution:**
```powershell
# Use different port
python manage.py runserver 8001
# Then access at http://127.0.0.1:8001/
```

### Problem: Frontend can't reach backend (CORS error)
**Solution:**
- Ensure backend is running on port 8000
- Frontend must be on port 5500
- Check browser console (F12) for exact error
- CORS is already enabled in settings.py

### Problem: "Login failed" or "Invalid credentials"
**Solution:**
1. Ensure you registered the user first
2. Check spelling of email/password
3. Open browser console (F12 → Console) to see error details
4. Check Django server terminal for error messages

### Problem: Booking history not showing
**Solution:**
1. Ensure you're logged in (token exists in browser)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console for errors (F12)
4. Verify booking was created (check Django Admin panel)

### Problem: Can't run setup.bat or run_backend.bat
**Solution:**
- Right-click file → "Run as Administrator"
- Or run commands manually in PowerShell
- Some antivirus may block .bat files

---

## 📁 PROJECT STRUCTURE

```
Garage41/                      # Main project folder
├── manage.py                  # Django CLI
├── requirements.txt           # Python packages
├── README.md                  # Detailed documentation
├── QUICKSTART.md              # This file
├── setup.bat                  # Automated setup
├── run_backend.bat            # Run Django backend
├── run_frontend.bat           # Run frontend server
│
├── garage41/                  # Django project config
│   ├── settings.py           # Database, CORS, Apps config
│   ├── urls.py               # URL routing
│   └── wsgi.py               # WSGI app
│
├── garage_app/               # Django app (backend logic)
│   ├── models.py             # User, Booking models
│   ├── views.py              # API views (register, login, etc)
│   ├── serializers.py        # DRF serializers
│   ├── urls.py               # App URL routing
│   ├── admin.py              # Django admin config
│   └── apps.py
│
├── BikeShowroom.html         # Landing page
├── user_login.html           # User login form
├── admin_login.html          # Admin login form
├── registration.html         # Registration form
├── homepage.html             # Home page (after login)
├── booking.html              # Booking form
├── admin_homepage.html       # Admin dashboard
├── grid.html                 # (placeholder)
└── jsfile.js                 # Frontend API client
```

---

## 🎯 QUICK START (TL;DR)

```powershell
# Terminal 1: Setup
cd e:\FrontEnd\Garage41
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser    # Create admin account
python manage.py runserver          # Keep running!

# Terminal 2: Frontend
cd e:\FrontEnd\Garage41
python -m http.server 5500          # Keep running!

# Terminal 3: Use browser
# Open: http://127.0.0.1:5500/BikeShowroom.html
```

---

## ✅ VERIFICATION CHECKLIST

Before considering setup complete, verify:

- [ ] MySQL database `garage41` created
- [ ] Python virtual environment activated
- [ ] All dependencies installed (no errors)
- [ ] Database migrations applied successfully
- [ ] Superuser account created
- [ ] Django backend running on port 8000
- [ ] Frontend server running on port 5500
- [ ] Can access http://127.0.0.1:5500/BikeShowroom.html
- [ ] Can register a new user
- [ ] Can login with registered account
- [ ] Can create a booking
- [ ] Booking appears in service history
- [ ] Can access Django admin at http://127.0.0.1:8000/admin/

---

## 📞 SUPPORT & HELP

If you encounter issues:

1. **Check the main README.md** for detailed documentation
2. **Check browser console** (F12 → Console tab) for JavaScript errors
3. **Check Django terminal** for API errors
4. **Verify MySQL is running** and database exists
5. **Clear browser cache** (Ctrl+Shift+Delete)
6. **Restart both servers** and try again

---

## 🎓 LEARNING RESOURCES

- **Django Documentation:** https://docs.djangoproject.com/
- **Django REST Framework:** https://www.django-rest-framework.org/
- **Bootstrap 5:** https://getbootstrap.com/
- **MySQL:** https://dev.mysql.com/doc/

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready

Happy Coding! 🚀
