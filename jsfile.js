
/* Centralized API client and helpers for login/register/booking */
const API_BASE = "http://127.0.0.1:8000/api";

function setAuth(token) {
    localStorage.setItem('authToken', token);
    console.log('Token stored:', token.substring(0, 20) + '...');
}

function getAuth() {
    return localStorage.getItem('authToken');
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User stored:', user);
}

function getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
}

function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('Auth cleared');
}

async function handleLogin(e, isAdmin = false) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    console.log('Login attempt:', { email, isAdmin });
    
    try {
        const res = await fetch(`${API_BASE}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        console.log('Login response status:', res.status);
        
        const data = await res.json();
        console.log('Login response data:', data);
        
        if (res.ok && data.token) {
            setAuth(data.token);
            setUser(data.user || { email });
            alert('Login successful!');
            if (isAdmin) {
                window.location.href = 'admin_homepage.html';
            } else {
                window.location.href = 'homepage.html';
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('Network or server error: ' + err.message + '\n\nMake sure backend is running on http://127.0.0.1:8000');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('#name').value;
    const phone = form.querySelector('#phone').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    console.log('Registration attempt:', { name, phone, email });
    
    try {
        const res = await fetch(`${API_BASE}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, password })
        });
        console.log('Registration response status:', res.status);
        
        const data = await res.json();
        console.log('Registration response data:', data);
        
        if (res.ok && data.token) {
            setAuth(data.token);
            setUser(data.user || { name, email, phone });
            alert('Registration successful! Welcome!');
            window.location.href = 'homepage.html';
        } else {
            alert(data.message || 'Registration failed: ' + JSON.stringify(data));
        }
    } catch (err) {
        console.error('Registration error:', err);
        alert('Network or server error: ' + err.message + '\n\nMake sure backend is running on http://127.0.0.1:8000');
    }
}

async function handleBooking(e) {
    e.preventDefault();
    const token = getAuth();
    if (!token) {
        alert('Please login to book an appointment');
        window.location.href = 'user_login.html';
        return;
    }
    const form = e.target;
    const payload = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        bikeModel: form.querySelector('#bikeModel').value,
        serviceType: form.querySelector('#serviceType').value,
        serviceDate: form.querySelector('#serviceDate').value,
        serviceTime: form.querySelector('#serviceTime').value,
        notes: form.querySelector('#notes').value
    };
    try {
        const res = await fetch(`${API_BASE}/bookings/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
            alert('Booking created successfully');
            window.location.href = 'homepage.html';
        } else {
            alert(data.message || 'Booking failed');
        }
    } catch (err) {
        console.error(err);
        alert('Network or server error');
    }
}

async function fetchHistory() {
    const token = getAuth();
    if (!token) return null;
    try {
        const res = await fetch(`${API_BASE}/user/history/`, { 
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'GET'
        });
        if (!res.ok) {
            console.log('History fetch failed:', res.status);
            return null;
        }
        const data = await res.json();
        console.log('History data:', data);
        return Array.isArray(data) ? data : data.history || [];
    } catch (err) {
        console.error('History fetch error:', err);
        return null;
    }
}

async function fetchAllBookings() {
    const token = getAuth();
    if (!token) return null;
    try {
        const res = await fetch(`${API_BASE}/bookings/`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.bookings || data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                clearAuth();
                window.location.href = 'user_login.html';
            });
        }
    
    // show/hide logout button depending on auth
    const token = getAuth();
    if (logoutBtn) {
        logoutBtn.style.display = token ? 'inline' : 'none';
    }
    const userLoginForm = document.getElementById('userLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const registerForm = document.getElementById('registerForm');
    const bookingForm = document.getElementById('bookingForm');

    if (userLoginForm) userLoginForm.addEventListener('submit', (e) => handleLogin(e, false));
    if (adminLoginForm) adminLoginForm.addEventListener('submit', (e) => handleLogin(e, true));
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
        // pre-fill booking form if user info exists
        const user = getUser();
        if (user) {
            if (bookingForm.querySelector('#name') && user.name) bookingForm.querySelector('#name').value = user.name;
            if (bookingForm.querySelector('#email') && user.email) bookingForm.querySelector('#email').value = user.email;
            if (bookingForm.querySelector('#phone') && user.phone) bookingForm.querySelector('#phone').value = user.phone;
        }
    }

    // if we are on homepage, try to populate user history
    const historyContainer = document.getElementById('historyContainer');
    const historySection = document.getElementById('historySection');
    if (historyContainer) {
        fetchHistory().then(history => {
            console.log('Fetched history:', history);
            if (!history) {
                historyContainer.innerHTML = '<p>Please <a href="user_login.html">login</a> to view your service history.</p>';
                if (historySection) historySection.style.display = 'block';
                return;
            }
            if (!Array.isArray(history) || history.length === 0) {
                historyContainer.innerHTML = '<p>No service bookings found. <a href="booking.html">Book a new service</a></p>';
                if (historySection) historySection.style.display = 'block';
                return;
            }
            const list = document.createElement('ul');
            list.className = 'list-group';
            history.forEach(it => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${it.serviceDate} - ${it.serviceType} - ${it.bikeModel} (${it.status || 'pending'})`;
                list.appendChild(li);
            });
            historyContainer.innerHTML = '<h4 class="mb-3">Your Service History</h4>';
            historyContainer.appendChild(list);
            if (historySection) historySection.style.display = 'block';
        });
    }

    // if we have a welcomeUser element, show the current user name
    const welcomeUser = document.getElementById('welcomeUser');
    if (welcomeUser) {
        const u = getUser();
        if (u && (u.name || u.email)) {
            welcomeUser.innerHTML = `Welcome, <strong>${u.name || u.email}</strong>`;
        } else {
            welcomeUser.innerHTML = `<a href="user_login.html">Sign in</a> or <a href="registration.html">Register</a>`;
        }
    }

    // if we are on admin homepage, fetch all bookings
    const adminListContainer = document.getElementById('adminBookingsContainer');
    if (adminListContainer) {
        fetchAllBookings().then(bookings => {
            if (!bookings) {
                adminListContainer.innerHTML = '<p>Unable to fetch bookings. Ensure admin is logged in.</p>';
                return;
            }
            const table = document.createElement('table');
            table.className = 'table';
            table.innerHTML = '<thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Bike Model</th><th>Service</th><th>Date</th></tr></thead>';
            const tbody = document.createElement('tbody');
            bookings.forEach(b => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${b.id || ''}</td><td>${b.name || ''}</td><td>${b.email || ''}</td><td>${b.phone || ''}</td><td>${b.bikeModel || ''}</td><td>${b.serviceType || ''}</td><td>${b.serviceDate || ''}</td>`;
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            adminListContainer.appendChild(table);
        });
    }
});

