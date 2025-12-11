@echo off
REM Production server startup script for Windows (using Gunicorn alternative)

cd /d "%~dp0"

REM Check if virtual environment exists
if not exist ".venv" (
    echo Virtual environment not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

REM Collect static files
echo Collecting static files...
python manage.py collectstatic --noinput

REM Start production server with waitress (Windows WSGI server)
echo Starting production server with Waitress...
echo Server will be available at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check if waitress is installed
pip show waitress >nul 2>&1
if errorlevel 1 (
    echo Installing waitress WSGI server...
    pip install waitress
)

waitress-serve --host=0.0.0.0 --port=8000 config.wsgi:application
