# ABDOS Project Shutdown Script
# This script stops all running instances of the backend and frontend servers

Write-Host "Stopping ABDOS Project..." -ForegroundColor Yellow
Write-Host "------------------------------" -ForegroundColor Yellow

# Stop all Python processes that are running model_api.py
Write-Host "Stopping backend server (Model API)..." -ForegroundColor Cyan
Get-Process -Name "python" | Where-Object { $_.CommandLine -like "*model_api.py*" } | ForEach-Object {
    Write-Host "Stopping Python process with ID: $($_.Id)" -ForegroundColor Gray
    Stop-Process -Id $_.Id -Force
}

# Stop all Node.js processes that are running Next.js
Write-Host "Stopping frontend server (Next.js)..." -ForegroundColor Cyan
Get-Process -Name "node" | Where-Object { $_.CommandLine -like "*next*" } | ForEach-Object {
    Write-Host "Stopping Node.js process with ID: $($_.Id)" -ForegroundColor Gray
    Stop-Process -Id $_.Id -Force
}

Write-Host "------------------------------" -ForegroundColor Yellow
Write-Host "All servers have been stopped." -ForegroundColor Green 