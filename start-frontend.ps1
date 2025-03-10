# PowerShell script to start the frontend server
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Set-Location -Path "frontend/web"
npm run dev 