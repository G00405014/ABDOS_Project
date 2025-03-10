# PowerShell script to start the backend server
Write-Host "Starting backend server..." -ForegroundColor Cyan
Set-Location -Path "model"
python model_api.py 