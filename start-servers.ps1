# ABDOS Project Startup Script
# This script starts both the backend and frontend servers

Write-Host "Starting ABDOS Project..." -ForegroundColor Green
Write-Host "------------------------------" -ForegroundColor Green

# Start TensorFlow Serving in a new PowerShell window
Write-Host "Starting TensorFlow Serving..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .\start-tf-serving.ps1"

# Wait a moment for TensorFlow Serving to initialize
Write-Host "Waiting for TensorFlow Serving to initialize..." -ForegroundColor Yellow
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
Write-Host "- TensorFlow Serving: http://localhost:8501" -ForegroundColor Green
Write-Host "- Express Backend: http://localhost:3001" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "To stop the servers, run stop-servers.ps1 or close the server windows." -ForegroundColor Green 