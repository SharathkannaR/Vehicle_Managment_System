@echo off
REM Reset database for Garage41

echo ====================================================
echo Resetting Database
echo ====================================================
echo.

REM Navigate to script directory
cd /d "%~dp0"

REM Activate venv
call venv\Scripts\activate.bat

echo Deleting old database...
if exist db.sqlite3 del db.sqlite3

echo Deleting migrations...
cd garage_app
if exist migrations (
    cd migrations
    for /f %%f in ('dir /b *.py ^| findstr /v __init__') do del %%f
    cd ..
)
cd ..

echo Re-creating migrations...
python manage.py makemigrations

echo Applying migrations...
python manage.py migrate

echo Creating admin account...
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@garage41.local', 'admin@garage41.local', 'admin123', phone='0000000000', first_name='Admin') if not User.objects.filter(username='admin@garage41.local').exists() else None"

echo.
echo ====================================================
echo Database Reset Complete!
echo ====================================================
echo.
pause
