# Royal Enfield Vehicle Service Management System

A complete vehicle service management system built with Django backend and HTML/CSS/JavaScript frontend.

## Project Structure

```
Garage41/
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── garage41/                 # Django project folder
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   ├── wsgi.py              # WSGI application
│   └── __init__.py
├── garage_app/              # Django app
│   ├── models.py            # Database models (User, Booking)
│   ├── views.py             # API views
│   ├── serializers.py       # DRF serializers
│   ├── urls.py              # App URL routing
│   ├── admin.py             # Admin interface
│   ├── apps.py
│   └── __init__.py
├── BikeShowroom.html        # Landing page with login buttons
├── user_login.html          # User login page
├── admin_login.html         # Admin login page
├── registration.html        # User registration page
├── homepage.html            # Home page (shows user history)
├── booking.html             # Booking appointment page
├── admin_homepage.html      # Admin dashboard
├── jsfile.js                # Frontend API client (shared across pages)
└── README.md                # This file
```

## Features

✅ **User Management**
- User registration with email, password, name, phone
- User login with JWT token authentication
- Password hashing and validation

✅ **Booking System**
- Create service bookings with bike model, service type, date/time
- View personal booking history
- Track booking status (pending, confirmed, completed, cancelled)

✅ **Admin Dashboard**
- View all customer bookings
- Monitor service requests
- Track booking status

✅ **Frontend**
- Responsive design with Bootstrap 5
- Real-time form validation
- Token-based authentication (localStorage)
- Auto-populate user info in booking form
- Service history display on home page

## Prerequisites

- **Python 3.8+**
- **MySQL 5.7+**
- **Node.js** (optional, for live server)
- **pip** (Python package manager)

## Installation & Setup

### Step 1: Create MySQL Database

Open MySQL Command Line Client and run:

```sql
CREATE DATABASE garage41 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'root'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON garage41.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

If using different MySQL user/password, update `garage41/settings.py` later.

### Step 2: Install Python Dependencies

Navigate to the `Garage41` folder and create a virtual environment:

```powershell
# On Windows PowerShell
python -m venv venv
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure Database Settings (if needed)

Edit `garage41/settings.py` and update DATABASES section if you used custom MySQL credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'garage41',
        'USER': 'your_mysql_user',      # Update if not 'root'
        'PASSWORD': 'your_password',    # Update if password set
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Step 4: Run Migrations

Create database tables:

```powershell
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Create Superuser (Admin)

Create an admin account for Django admin panel:

```powershell
python manage.py createsuperuser
# Follow prompts: username, email, password
```

## Running the Project

### Terminal 1: Start Django Backend

```powershell
# From Garage41 folder, activate venv first
venv\Scripts\Activate.ps1

# Run Django development server
python manage.py runserver

# Server runs at: http://127.0.0.1:8000/
```

### Terminal 2: Start Frontend (Live Server)

Option A - Using Python's built-in server:
```powershell
# From Garage41 folder (different terminal)
python -m http.server 5500
# Open: http://127.0.0.1:5500/BikeShowroom.html
```

Option B - Using VS Code Live Server Extension:
- Right-click `BikeShowroom.html` → "Open with Live Server"
- Typically opens at `http://127.0.0.1:5500/BikeShowroom.html`

### Access the Application

**Frontend:**
- Home Page: http://127.0.0.1:5500/BikeShowroom.html
- User Login: http://127.0.0.1:5500/user_login.html
- Registration: http://127.0.0.1:5500/registration.html
- Booking: http://127.0.0.1:5500/booking.html

**Backend:**
- API Root: http://127.0.0.1:8000/api/
- Django Admin: http://127.0.0.1:8000/admin/ (login with superuser)

## API Endpoints

All endpoints (except register/login) require Authorization header:
```
Authorization: Bearer <token>
```

### Authentication

**POST** `/api/register/`
- Register new user
- Body: `{ "username": "bob", "email": "bob@example.com", "password": "pass123", "first_name": "Bob", "phone": "9999999" }`
- Response: `{ "token": "jwt_token", "user": {...}, "message": "User registered successfully" }`

**POST** `/api/login/`
- User login
- Body: `{ "email": "bob@example.com", "password": "pass123" }`
- Response: `{ "token": "jwt_token", "user": {...}, "message": "Login successful" }`

### Bookings

**GET** `/api/bookings/` (Admin: all bookings, User: own bookings)
- Fetch all bookings (admin) or user's bookings
- Response: `[ { booking_data }, ... ]`

**POST** `/api/bookings/`
- Create new booking
- Body: `{ "name": "John", "email": "john@example.com", "phone": "9999", "bikeModel": "Bullet", "serviceType": "Oil Change", "serviceDate": "2025-12-10", "serviceTime": "10:00", "notes": "..." }`
- Response: `{ booking_data }`

**GET** `/api/bookings/my_bookings/`
- Fetch user's own bookings
- Response: `[ { booking_data }, ... ]`

**GET** `/api/user/history/`
- Fetch user's service history
- Response: `[ { booking_data }, ... ]`

## Testing the System

### Test Flow

1. **Register a New User**
   - Go to: http://127.0.0.1:5500/registration.html
   - Fill form: username, email, password, name, phone
   - Click Register
   - Should redirect to homepage and show welcome message

2. **Book an Appointment**
   - From homepage, click "Book an Appointment"
   - Form fields should auto-populate with user info
   - Fill remaining fields: bike model, service type, date, time
   - Click Submit
   - Booking saved to database, redirect to homepage

3. **View History**
   - On homepage, scroll down to see "Your Service History"
   - Lists all past bookings with status

4. **Admin Dashboard**
   - Go to: http://127.0.0.1:8000/admin/
   - Login with superuser credentials
   - View all users and bookings
   - Or go to http://127.0.0.1:5500/admin_login.html and login as admin

## Database Schema

### User Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `first_name` - User's first name
- `last_name` - User's last name
- `phone` - Phone number
- `is_staff` - Is admin/staff
- `is_admin_user` - Custom admin flag

### Booking Table
- `id` - Primary key
- `user_id` - Foreign key to User
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone
- `bikeModel` - Bike model name
- `serviceType` - Type of service
- `serviceDate` - Appointment date
- `serviceTime` - Appointment time
- `notes` - Additional notes
- `status` - Booking status (pending, confirmed, completed, cancelled)
- `created_at` - Booking creation timestamp
- `updated_at` - Last update timestamp

## Troubleshooting

### MySQL Connection Error
```
Error: (2003, "Can't connect to MySQL server...")
```
**Solution:**
- Ensure MySQL is running: `mysql --version`
- Verify database name, user, password in `settings.py`
- Check MySQL service is running (Services → MySQL)

### ModuleNotFoundError: No module named 'mysqlclient'
```
pip install mysqlclient
# Or if error persists, use:
pip install PyMySQL
# Then add in garage41/settings.py after imports:
import pymysql
pymysql.install_as_MySQLdb()
```

### CORS Error (Frontend can't reach backend)
- Backend should have CORS enabled (already configured in settings.py)
- Ensure frontend runs on port 5500 (not 3000 or others)
- Check browser console for exact error

### Token Expired or Invalid
- Clear localStorage: Open browser DevTools → Application → Local Storage → Clear All
- Re-login to get new token

### Bookings Not Showing in History
- Check if you're logged in (token should exist in localStorage)
- Verify browser console for errors (F12 → Console tab)
- Check backend logs for API errors

## Production Deployment

Before deploying to production:

1. Change `DEBUG = False` in `settings.py`
2. Set secure `SECRET_KEY`
3. Configure `ALLOWED_HOSTS` with your domain
4. Use HTTPS
5. Set up email backend for notifications
6. Use a production WSGI server (Gunicorn, uWSGI)
7. Set up a reverse proxy (Nginx, Apache)
8. Configure proper database backups

## Files Summary

| File | Purpose |
|------|---------|
| `manage.py` | Django management script |
| `requirements.txt` | Python package list |
| `garage41/settings.py` | Django configuration |
| `garage_app/models.py` | Database models |
| `garage_app/views.py` | API endpoints |
| `garage_app/serializers.py` | Data serialization |
| `jsfile.js` | Frontend API client |
| `BikeShowroom.html` | Landing page |
| `user_login.html` | Login page |
| `registration.html` | Registration page |
| `booking.html` | Booking form |
| `homepage.html` | Home with history |
| `admin_homepage.html` | Admin dashboard |
| `admin_login.html` | Admin login |

## Support

If you encounter issues:
1. Check browser console (F12) for JavaScript errors
2. Check Django server terminal for API errors
3. Verify MySQL is running and database exists
4. Ensure all dependencies installed: `pip install -r requirements.txt`
5. Try clearing browser cache and localStorage

## License

This project is open source for educational purposes.

---

**Last Updated:** December 2025
**Version:** 1.0
