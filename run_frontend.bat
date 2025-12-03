@echo off
REM Frontend server startup

title Frontend Server - Royal Enfield Service
echo ====================================================
echo Royal Enfield Service - Frontend Server
echo ====================================================
echo.
echo Make sure Django backend is running in another terminal:
echo   python manage.py runserver
echo.

python -m http.server 5500

pause
