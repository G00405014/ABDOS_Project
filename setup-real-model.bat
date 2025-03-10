@echo off
echo ===================================
echo ABDOS Real Model Setup
echo ===================================
echo.

cd model

echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python 3.8 or higher and try again.
    goto :end
)

echo.
echo Choose setup method:
echo 1. GUI Setup (recommended)
echo 2. Command-line Setup
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo Starting GUI setup...
    python setup_real_model.py
) else if "%choice%"=="2" (
    echo.
    echo Starting command-line setup...
    python setup_real_model_cli.py
) else (
    echo.
    echo Invalid choice. Please run the script again and select 1 or 2.
    goto :end
)

:end
echo.
echo Press any key to exit...
pause >nul 