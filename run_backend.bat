@echo off
REM Run script for Royal Enfield Service Management System

title Royal Enfield Service System
echo ====================================================
echo Royal Enfield Service Management System - Startup
echo ====================================================
echo.
echo This will start both backend and frontend servers
echo.

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Start Django backend
echo Starting Django Backend on http://127.0.0.1:8000...
echo NOTE: Keep this terminal open to run backend
echo.
echo To start Frontend, open another terminal/PowerShell and run:
echo   cd /d %CD%
echo   python -m http.server 5500
echo.
echo Then open your browser to:
echo   http://127.0.0.1:5500/BikeShowroom.html
echo.
echo ====================================================
echo.

python manage.py runserver

pause
