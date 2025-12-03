# 🚀 START HERE - Complete Setup Guide

## ⚡ Quick Setup (3 options)

### **Option 1: Automated Setup (EASIEST - 30 seconds)**

1. Open PowerShell in `e:\FrontEnd\Garage41\`
2. Run this command:
```powershell
.\setup.bat
```

It will automatically:
- ✅ Create virtual environment
- ✅ Install all dependencies
- ✅ Setup SQLite database
- ✅ Create admin account
- ✅ Run migrations

**Admin Credentials:**
- Email: `admin@garage41.local`
- Password: `admin123`

---

### **Option 2: Reset if Database Has Issues**

If you already ran setup but registration isn't working, run:

```powershell
.\reset_db.bat
```

This will:
- Delete old database
- Clear migrations
- Recreate everything fresh
- Create new admin account

---

### **Option 3: Manual Step-by-Step**

```powershell
# Navigate to project
cd e:\FrontEnd\Garage41

# Create virtual environment
python -m venv venv

# Activate
venv\Scripts\Activate.ps1

# Install packages
pip install -r requirements.txt

# Create database
python manage.py makemigrations
python manage.py migrate

# Create admin
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@garage41.local', 'admin@garage41.local', 'admin123', phone='0000000000', first_name='Admin')"
```

---

## 🎬 Running the Application

### **Start Backend (Terminal 1)**

```powershell
cd e:\FrontEnd\Garage41
venv\Scripts\Activate.ps1
python manage.py runserver
```

✅ Keep this running! You should see:
```
Starting development server at http://127.0.0.1:8000/
```

---

### **Start Frontend (Terminal 2 - NEW WINDOW)**

```powershell
cd e:\FrontEnd\Garage41
python -m http.server 5500
```

✅ Keep this running! You should see:
```
Serving HTTP on 127.0.0.1 port 5500
```

---

## 🌐 Open Your Website

Visit: **http://127.0.0.1:5500/BikeShowroom.html**

---

## 🧪 Test Registration & Login

### **1. Register New User**
- Click "Register" button
- Fill in: Name, Phone, Email, Password
- Click "Register"
- ✅ Should redirect to homepage
- ✅ Data should be saved in database

### **2. Login as User**
- Click "User Login"
- Enter your email & password
- Click "Login"
- ✅ Should show "Welcome, [Your Name]"
- ✅ Should show "Your Service History" (empty if first login)

### **3. Book an Appointment**
- Click "Book an Appointment" button
- Form auto-fills your name, email, phone
- Fill: Bike Model, Service Type, Date, Time, Notes
- Click "Book"
- ✅ Should see booking in "Your Service History"
- ✅ Data saved in database

### **4. Admin Login**
- Visit: **http://127.0.0.1:5500/BikeShowroom.html**
- Click "Admin Login"
- Email: `admin@garage41.local`
- Password: `admin123`
- ✅ Should show all customer bookings in table format

---

## ✅ All Data Stored in Database

| Module | Data Stored | Location |
|--------|------------|----------|
| **Registration** | User info (name, email, phone, password hash) | `db.sqlite3` → `garage_app_user` |
| **Login** | Authentication via JWT token | Token stored in browser `localStorage` |
| **Booking** | Service bookings (date, time, bike model, service type) | `db.sqlite3` → `garage_app_booking` |
| **Admin Panel** | All user bookings visible to admin | Django admin: `http://127.0.0.1:8000/admin/` |

---

## 🔍 Verify Installation

Run this to check everything:
```powershell
python check_install.py
```

---

## 🛠️ Common Issues & Fixes

### **Issue: "Network or server error" during registration**
**Solution:** Make sure both backends and frontend servers are running
```powershell
# Check:
# Terminal 1: python manage.py runserver (should show "Development server at 8000")
# Terminal 2: python -m http.server 5500 (should show "Serving HTTP on 5500")
```

### **Issue: "Port 8000 already in use"**
**Solution:** Kill process using port 8000
```powershell
netstat -ano | findstr :8000
taskkill /PID {PID} /F
python manage.py runserver
```

### **Issue: "Port 5500 already in use"**
**Solution:** Kill process using port 5500
```powershell
netstat -ano | findstr :5500
taskkill /PID {PID} /F
python -m http.server 5500
```

### **Issue: "ModuleNotFoundError: No module named 'mysqlclient'"**
**Solution:** Just reinstall requirements
```powershell
pip install -r requirements.txt
```

### **Issue: Database shows old data**
**Solution:** Reset database
```powershell
.\reset_db.bat
```

---

## 📊 Database Schema

### **User Table**
```
id (Auto)
username (Unique)
email (Unique)
password (Hashed)
first_name (User's name)
phone
is_staff (Admin flag)
is_superuser
created_at
```

### **Booking Table**
```
id (Auto)
user_id (Foreign Key → User)
name
email
phone
bikeModel
serviceType
serviceDate
serviceTime
notes
status (pending/confirmed/completed/cancelled)
created_at
updated_at
```

---

## 🎯 Project Structure

```
Garage41/
├── manage.py                 (Django CLI)
├── db.sqlite3               (Database - created after setup)
├── requirements.txt         (Python packages)
├── setup.bat               (Automated setup)
├── reset_db.bat            (Reset database)
├── check_install.py        (Verify installation)
├── run_backend.bat         (Start backend)
├── run_frontend.bat        (Start frontend)
│
├── garage41/               (Project config)
│   ├── settings.py         (Django settings)
│   ├── urls.py            (URL routing)
│   └── wsgi.py
│
├── garage_app/            (Main app)
│   ├── models.py          (User & Booking models)
│   ├── views.py           (API endpoints)
│   ├── serializers.py     (Data serialization)
│   ├── urls.py            (App routes)
│   ├── admin.py           (Admin interface)
│   └── migrations/        (Database migrations)
│
└── HTML Pages:
    ├── BikeShowroom.html         (Landing page)
    ├── user_login.html           (User login)
    ├── admin_login.html          (Admin login)
    ├── registration.html         (User registration)
    ├── homepage.html             (User dashboard)
    ├── booking.html              (Booking form)
    ├── admin_homepage.html       (Admin dashboard)
    ├── jsfile.js                 (API client)
    └── Style.css                 (Styling)
```

---

## 🔐 Authentication Flow

```
1. User fills registration form (name, email, password, phone)
   ↓
2. Frontend sends POST to http://127.0.0.1:8000/api/register/
   ↓
3. Backend validates & creates user in database
   ↓
4. Backend returns JWT token
   ↓
5. Frontend stores token in browser localStorage
   ↓
6. All future requests include: Authorization: Bearer {token}
   ↓
7. Backend validates token & returns user-specific data
```

---

## 🚀 You're Ready!

**Everything is configured. Just run:**

**Terminal 1:**
```powershell
cd e:\FrontEnd\Garage41
venv\Scripts\Activate.ps1
python manage.py runserver
```

**Terminal 2:**
```powershell
cd e:\FrontEnd\Garage41
python -m http.server 5500
```

**Then open:**
```
http://127.0.0.1:5500/BikeShowroom.html
```

**Test registration → login → booking → view history**

All data is automatically saved in the database! ✅

---

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Setup everything | `.\setup.bat` |
| Reset database | `.\reset_db.bat` |
| Check installation | `python check_install.py` |
| Start backend | `python manage.py runserver` |
| Start frontend | `python -m http.server 5500` |
| View Django admin | Visit: `http://127.0.0.1:8000/admin/` |
| View API docs | Check: `http://127.0.0.1:8000/api/` |

---

Happy coding! 🎉
