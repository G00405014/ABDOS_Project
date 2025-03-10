Write-Host "===================================" -ForegroundColor Cyan
Write-Host "ABDOS Real Model Setup" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Change to the model directory
Set-Location -Path "model"

# Check if Python is installed
Write-Host "Checking for Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "Python is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Python 3.8 or higher and try again." -ForegroundColor Red
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "Choose setup method:" -ForegroundColor Yellow
Write-Host "1. GUI Setup (recommended)" -ForegroundColor White
Write-Host "2. Command-line Setup" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Starting GUI setup..." -ForegroundColor Green
    python setup_real_model.py
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Starting command-line setup..." -ForegroundColor Green
    python setup_real_model_cli.py
} else {
    Write-Host ""
    Write-Host "Invalid choice. Please run the script again and select 1 or 2." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 