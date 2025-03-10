@echo off
echo Starting ABDOS servers...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.

echo Starting backend server...
start "ABDOS Backend" cmd /k "cd model && python model_api.py"

echo Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

echo Starting frontend server...
start "ABDOS Frontend" cmd /k "cd frontend\web && npm run dev"

echo.
echo Servers started in separate windows.
echo.
echo =============================================
echo What would you like to do next?
echo =============================================
echo 1. Exit this window (servers will keep running)
echo 2. Stop all servers and exit
echo.

choice /C 12 /N /M "Enter your choice (1 or 2): "

if errorlevel 2 (
    echo.
    echo Stopping all servers...
    taskkill /FI "WINDOWTITLE eq ABDOS Backend*" /F
    taskkill /FI "WINDOWTITLE eq ABDOS Frontend*" /F
    echo All servers stopped.
    timeout /t 2 /nobreak > nul
    exit
) else (
    echo.
    echo Exiting batch file. Servers will continue running in their windows.
    timeout /t 2 /nobreak > nul
    exit
) 