# ABDOS Project Startup Script (Flask API Version)
# This script starts both the backend and frontend servers using Flask API instead of TensorFlow Serving

Write-Host "Starting ABDOS Project (Flask API Version)..." -ForegroundColor Green
Write-Host "------------------------------" -ForegroundColor Green

# Start the Flask API in a new PowerShell window
Write-Host "Starting Flask API..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\model'; python model_api.py"

# Wait a moment for the Flask API to initialize
Write-Host "Waiting for Flask API to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start the Express backend server in a new PowerShell window
Write-Host "Starting Express backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm start"

# Wait a moment for the backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start the frontend server (Next.js) in a new PowerShell window
Write-Host "Starting frontend server (Next.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\web'; npm run dev"

Write-Host "------------------------------" -ForegroundColor Green
Write-Host "Servers started successfully!" -ForegroundColor Green
Write-Host "- Flask API: http://localhost:5000" -ForegroundColor Green
Write-Host "- Express Backend: http://localhost:3001" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "To stop the servers, run stop-servers.ps1 or close the server windows." -ForegroundColor Green 