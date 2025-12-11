@echo off
REM Simple script to start the Django YOLO API server on Windows

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

REM Start the server
echo Starting Django development server...
echo Server will be available at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python manage.py runserver 0.0.0.0:8000
