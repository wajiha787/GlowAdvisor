@echo off
echo ================================================
echo 🚀 Starting GlowAdvisor AI Backend Server
echo ================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "main.py" (
    echo ❌ main.py not found. Please run this from the api-backend directory
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  Warning: .env file not found!
    echo    Make sure you have set up your GEMINI_API_KEY
    echo    Create a .env file with: GEMINI_API_KEY=your_api_key_here
    echo.
)

echo 📍 Server will be available at: http://localhost:8000
echo 📖 API Documentation: http://localhost:8000/docs
echo 🔄 Auto-reload enabled
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

REM Start the server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

pause 