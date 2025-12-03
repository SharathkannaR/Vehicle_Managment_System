@echo off
REM Quick setup script for Royal Enfield Service Management System

echo ====================================================
echo Royal Enfield Service Management System Setup
echo ====================================================
echo.

REM Navigate to script directory
cd /d "%~dp0"
echo Current directory: %cd%
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/5] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [4/5] Running migrations...
python manage.py makemigrations
python manage.py migrate
if errorlevel 1 (
    echo ERROR: Failed to run migrations. Check MySQL connection.
    pause
    exit /b 1
)

echo [5/5] Creating superuser (admin)...
echo.
echo Creating default admin account...
echo Username: admin@garage41.local
echo Password: admin123
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@garage41.local', 'admin@garage41.local', 'admin123', phone='0000000000', first_name='Admin') if not User.objects.filter(username='admin@garage41.local').exists() else None"

echo.
echo ====================================================
echo Setup Complete!
echo ====================================================
echo.
echo Next steps:
echo 1. Start Backend:   python manage.py runserver
echo 2. Start Frontend:  python -m http.server 5500
echo 3. Open: http://127.0.0.1:5500/BikeShowroom.html
echo.
pause
