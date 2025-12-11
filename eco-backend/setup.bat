@echo off
REM Setup script for YOLO Image Classification API on Windows

echo ====================================
echo YOLO Image Classification API Setup
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from python.org
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
)

echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo Installing dependencies...
echo This may take several minutes (downloading PyTorch, YOLO, etc.)
echo.
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Running database migrations...
python manage.py migrate
if errorlevel 1 (
    echo ERROR: Failed to run migrations
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo To start the server, run:
echo   start_server.bat
echo.
echo Or manually:
echo   .venv\Scripts\activate
echo   python manage.py runserver
echo.
echo Then test the API with:
echo   python test_api.py path\to\your\image.jpg
echo.
pause
