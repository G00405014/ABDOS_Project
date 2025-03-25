# ABDOS Project Shutdown Script (Flask API Version)
# This script stops all servers started by start-servers-flask.ps1

Write-Host "Stopping ABDOS Project (Flask API Version)..." -ForegroundColor Yellow
Write-Host "------------------------------" -ForegroundColor Yellow

# Find and stop Python processes (Flask API)
$pythonProcesses = Get-Process -Name python -ErrorAction SilentlyContinue
if ($pythonProcesses) {
    Write-Host "Stopping Flask API..." -ForegroundColor Cyan
    $pythonProcesses | ForEach-Object { 
        Stop-Process -Id $_.Id -Force
        Write-Host "Stopped process with ID $($_.Id)" -ForegroundColor Gray
    }
    Write-Host "Flask API stopped." -ForegroundColor Green
} else {
    Write-Host "No Flask API processes found." -ForegroundColor Yellow
}

# Find and stop Node.js processes (Express backend and Next.js frontend)
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Stopping Node.js processes (Express backend and Next.js frontend)..." -ForegroundColor Cyan
    $nodeProcesses | ForEach-Object { 
        Stop-Process -Id $_.Id -Force
        Write-Host "Stopped process with ID $($_.Id)" -ForegroundColor Gray
    }
    Write-Host "Node.js processes stopped." -ForegroundColor Green
} else {
    Write-Host "No Node.js processes found." -ForegroundColor Yellow
}

Write-Host "------------------------------" -ForegroundColor Yellow
Write-Host "All servers stopped successfully!" -ForegroundColor Green 