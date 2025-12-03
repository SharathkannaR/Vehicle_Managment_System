#!/usr/bin/env python
"""
Installation Verification Script for Royal Enfield Service Management System
Checks if all required packages are installed and database is configured correctly
"""

import sys
import os

def check_python_version():
    """Check if Python version is 3.8 or higher"""
    if sys.version_info >= (3, 8):
        print("✅ Python version: " + ".".join(map(str, sys.version_info[:3])))
        return True
    else:
        print("❌ Python version too old. Required: 3.8+, Found: " + ".".join(map(str, sys.version_info[:3])))
        return False

def check_packages():
    """Check if all required packages are installed"""
    required_packages = [
        'django',
        'rest_framework',
        'corsheaders',
        'rest_framework_simplejwt',
    ]
    
    all_installed = True
    print("\n📦 Checking installed packages:")
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"  ✅ {package}")
        except ImportError:
            print(f"  ❌ {package} - NOT INSTALLED")
            all_installed = False
    
    return all_installed

def check_django_files():
    """Check if Django project files exist"""
    required_files = [
        'manage.py',
        'requirements.txt',
        'garage41/settings.py',
        'garage41/urls.py',
        'garage_app/models.py',
        'garage_app/views.py',
        'garage_app/urls.py',
        'jsfile.js',
        'BikeShowroom.html',
        'homepage.html',
        'booking.html',
        'user_login.html',
        'registration.html',
    ]
    
    all_exist = True
    print("\n📁 Checking project files:")
    
    for file in required_files:
        if os.path.exists(file):
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file} - NOT FOUND")
            all_exist = False
    
    return all_exist

def check_database():
    """Check database connection"""
    print("\n🗄️  Checking database configuration:")
    try:
        import mysql.connector
        print("  ✅ MySQL connector available")
        
        # Try to connect
        try:
            conn = mysql.connector.connect(
                host='localhost',
                user='root',
                password='',
                database='garage41'
            )
            print("  ✅ Can connect to garage41 database")
            conn.close()
            return True
        except Exception as e:
            print(f"  ⚠️  Cannot connect to database: {str(e)}")
            print("     Make sure MySQL is running and garage41 database exists")
            return False
    except ImportError:
        print("  ℹ️  MySQL connector not found (will use mysqlclient)")
        try:
            import MySQLdb
            print("  ✅ MySQLdb available")
            return True
        except ImportError:
            print("  ❌ Neither mysql-connector nor MySQLdb found")
            return False

def main():
    print("=" * 60)
    print("Royal Enfield Service Management System")
    print("Installation Verification")
    print("=" * 60)
    
    checks = [
        ("Python Version", check_python_version()),
        ("Required Packages", check_packages()),
        ("Project Files", check_django_files()),
        ("Database", check_database()),
    ]
    
    print("\n" + "=" * 60)
    print("Summary:")
    print("=" * 60)
    
    all_passed = True
    for check_name, result in checks:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{check_name}: {status}")
        if not result:
            all_passed = False
    
    print("=" * 60)
    
    if all_passed:
        print("\n🎉 All checks passed! You're ready to run the application.\n")
        print("Next steps:")
        print("  1. Open Terminal 1: python manage.py runserver")
        print("  2. Open Terminal 2: python -m http.server 5500")
        print("  3. Open Browser: http://127.0.0.1:5500/BikeShowroom.html")
    else:
        print("\n⚠️  Some checks failed. Please fix the issues above before running.\n")
        print("Common fixes:")
        print("  - Install packages: pip install -r requirements.txt")
        print("  - Create database: CREATE DATABASE garage41;")
        print("  - Run migrations: python manage.py migrate")

if __name__ == '__main__':
    main()
