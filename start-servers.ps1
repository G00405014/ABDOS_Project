# ABDOS Project Startup Script
# This script starts both the backend and frontend servers

Write-Host "Starting ABDOS Project..." -ForegroundColor Green
Write-Host "------------------------------" -ForegroundColor Green

# Start the backend server (Model API) in a new PowerShell window
Write-Host "Starting backend server (Model API)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\model'; python model_api.py"

# Wait a moment for the backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start the frontend server (Next.js) in a new PowerShell window
Write-Host "Starting frontend server (Next.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\web'; npm run dev"

Write-Host "------------------------------" -ForegroundColor Green
Write-Host "Servers started successfully!" -ForegroundColor Green
Write-Host "- Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "To stop the servers, close the server windows or press Ctrl+C in each window." -ForegroundColor Green 