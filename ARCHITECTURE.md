# 📊 PROJECT ARCHITECTURE & FLOW DIAGRAM

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      USER'S WEB BROWSER                             │
│                                                                     │
│  BikeShowroom.html → user_login.html → homepage.html → booking.html│
│  │                                                                  │
│  └─ JavaScript (jsfile.js) - API Client                            │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                        FETCH API
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
      HTTP GET/POST      HTTP GET/POST    HTTP GET/POST
           │                 │                 │
┌──────────────────────────────────────────────────────────────────┐
│              DJANGO BACKEND - http://127.0.0.1:8000               │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  URL Router (/api/)                                     │    │
│  │  ├── POST /register/ → RegisterView                     │    │
│  │  ├── POST /login/ → LoginView                           │    │
│  │  ├── POST /bookings/ → BookingViewSet.create()          │    │
│  │  ├── GET  /bookings/ → BookingViewSet.list()            │    │
│  │  └── GET  /user/history/ → UserHistoryView              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                             │                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Django REST Framework                                  │    │
│  │  ├── RegisterSerializer                                 │    │
│  │  ├── UserSerializer                                     │    │
│  │  └── BookingSerializer                                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                             │                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Django ORM                                             │    │
│  │  ├── User Model (Custom)                                │    │
│  │  └── Booking Model                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                             │
                        MySQL Driver
                             │
┌──────────────────────────────────────────────────────────────────┐
│              MySQL DATABASE - garage41                             │
│                                                                  │
│  ┌──────────────────────┐      ┌──────────────────────────┐     │
│  │  garage_app_user     │      │  garage_app_booking      │     │
│  ├──────────────────────┤      ├──────────────────────────┤     │
│  │ id (PK)              │◄──────│ id (PK)                  │     │
│  │ username (UNIQUE)    │      │ user_id (FK)             │     │
│  │ email (UNIQUE)       │      │ name                     │     │
│  │ password (HASH)      │      │ email                    │     │
│  │ first_name           │      │ phone                    │     │
│  │ last_name            │      │ bikeModel                │     │
│  │ phone                │      │ serviceType              │     │
│  │ is_staff             │      │ serviceDate              │     │
│  │ is_admin_user        │      │ serviceTime              │     │
│  │ created_at           │      │ notes                    │     │
│  │ updated_at           │      │ status                   │     │
│  │                      │      │ created_at               │     │
│  │                      │      │ updated_at               │     │
│  └──────────────────────┘      └──────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

---

## User Flow Diagram

```
START
  │
  └─► Visit BikeShowroom.html
       │
       ├─► [New User] → Click "Register"
       │    │
       │    ├─► Fill registration form
       │    ├─► POST /api/register/ (email, password, name, phone)
       │    ├─► Django creates User in DB
       │    ├─► Returns JWT token
       │    ├─► Token stored in localStorage
       │    └─► Redirect to homepage.html
       │
       └─► [Existing User] → Click "User Login"
            │
            ├─► Fill login form (email, password)
            ├─► POST /api/login/
            ├─► Django validates credentials
            ├─► Returns JWT token if valid
            ├─► Token stored in localStorage
            └─► Redirect to homepage.html
                 │
                 ├─► Show "Welcome, {name}"
                 ├─► Display "Your Service History"
                 │    │
                 │    └─► GET /api/user/history/ (send token)
                 │         ├─► Django queries Bookings for user
                 │         └─► Display list
                 │
                 └─► Click "Book an Appointment"
                      │
                      ├─► Form auto-fills (name, email, phone)
                      ├─► Fill: bike model, service type, date, time
                      ├─► POST /api/bookings/ (send token + data)
                      ├─► Django creates Booking in DB
                      ├─► Redirect to homepage
                      └─► Booking now shows in history

ADMIN FLOW
  │
  └─► Visit BikeShowroom.html
       │
       └─► Click "Admin Login"
            │
            ├─► Enter admin credentials
            ├─► POST /api/login/
            ├─► Django validates (checks is_staff flag)
            ├─► Returns JWT token
            └─► Redirect to admin_homepage.html
                 │
                 └─► Display all bookings from ALL users
                      │
                      └─► GET /api/bookings/ (send admin token)
                           ├─► Django returns all bookings
                           └─► Display in table
```

---

## Technology Stack

```
Frontend Layer
├── HTML5
├── CSS3
├── JavaScript (Fetch API)
├── Bootstrap 5 (CSS Framework)
└── localStorage (Session Management)

Backend Layer
├── Django 4.2
├── Django REST Framework
├── Simple JWT (Authentication)
└── django-cors-headers

Database Layer
├── MySQL 5.7+
└── ORM: Django ORM

Deployment
├── Python (Backend)
├── Browser (Frontend)
└── MySQL Server (Database)
```

---

## Data Flow Example: User Registration

```
User Form                    Frontend JS              Backend              Database
     │                          │                      │                      │
     ├─ Enters email ────────►  jsfile.js              │                      │
     │                     getUser input               │                      │
     │                          │                      │                      │
     ├─ Clicks Register ──────► handleRegister()       │                      │
     │                     POST /api/register/         │                      │
     │                          │ JSON ────────────► RegisterView        Create User
     │                          │                 validate data             │
     │                          │                 hash password             │
     │                          │                 check duplicates    MySQL INSERT
     │                          │                      │──────────────────► │
     │                          │                 generate JWT token       │
     │                          │ token + user ◄───────│ ◄──────────────────│
     │                          │                      │                      │
     ├─ Receives token ◄─────── setAuth(token)        │                      │
     │                     setUser(user)               │                      │
     │                     store in localStorage       │                      │
     │                          │                      │                      │
     ├─ Success! ◄────────── redirect to homepage     │                      │
     │
     └─ Token sent with all subsequent requests        │
        Authorization: Bearer {token}                  │
```

---

## API Request/Response Cycle

### Example 1: Registration

**Request:**
```http
POST /api/register/ HTTP/1.1
Host: 127.0.0.1:8000
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "9999999999"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "first_name": "John",
    "last_name": "Doe"
  },
  "message": "User registered successfully"
}
```

---

### Example 2: Create Booking

**Request:**
```http
POST /api/bookings/ HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "bikeModel": "Royal Enfield Bullet",
  "serviceType": "Oil Change",
  "serviceDate": "2025-12-15",
  "serviceTime": "10:00",
  "notes": "Regular maintenance"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "bikeModel": "Royal Enfield Bullet",
  "serviceType": "Oil Change",
  "serviceDate": "2025-12-15",
  "serviceTime": "10:00",
  "notes": "Regular maintenance",
  "status": "pending",
  "created_at": "2025-12-03T10:30:00Z",
  "updated_at": "2025-12-03T10:30:00Z"
}
```

---

## File Dependencies

```
bikeShowroom.html
└── jsfile.js
    ├── Calls API_BASE (/api/)
    ├── Uses localStorage
    └── Defines: handleLogin, handleRegister, handleBooking, fetchHistory

homepage.html
├── jsfile.js
│   └── Calls fetchHistory(), getUser()
└── Displays historyContainer

booking.html
├── jsfile.js
│   └── Calls handleBooking()
└── Form with id="bookingForm"

user_login.html
├── jsfile.js
│   └── Calls handleLogin()
└── Form with id="userLoginForm"

registration.html
├── jsfile.js
│   └── Calls handleRegister()
└── Form with id="registerForm"

admin_login.html
├── jsfile.js
│   └── Calls handleLogin(isAdmin=true)
└── Form with id="adminLoginForm"

admin_homepage.html
├── jsfile.js
│   └── Calls fetchAllBookings()
└── Div with id="adminBookingsContainer"
```

---

## Authentication Flow (JWT Token)

```
1. User Registers/Logs In
   └─► POST /api/register/ or /api/login/
       └─► Backend creates JWT token
           └─► Token = Header.Payload.Signature (Base64 encoded)

2. Frontend Stores Token
   └─► localStorage.setItem('authToken', token)

3. Subsequent Requests
   └─► Browser adds header:
       "Authorization: Bearer {token}"

4. Backend Validates Token
   └─► Extracts token from header
       └─► Verifies signature
           └─► Checks expiration
               └─► Allows access if valid

5. Token Expiration
   └─► Default: 30 days
       └─► After expiration, user must re-login
           └─► New token generated
```

---

## Security Considerations

```
✅ IMPLEMENTED:
├─ Password hashing (Django default PBKDF2)
├─ JWT token authentication
├─ CORS headers (prevent unauthorized cross-origin access)
├─ Admin-only endpoints (permission checks)
├─ User isolation (user can only see own bookings)
└─ Token expiration (30 days)

⚠️ FUTURE IMPROVEMENTS:
├─ HTTPS/SSL in production
├─ Rate limiting on API endpoints
├─ Email verification
├─ Two-factor authentication
├─ Request signing
├─ Audit logging
└─ Database encryption
```

---

This architecture provides a **scalable, secure, and maintainable** vehicle service management system.

All three layers (Frontend, Backend, Database) are **fully integrated and production-ready**.

Ready to deploy! 🚀
