# PowerShell script to start both frontend and backend servers

# Function to check if a command exists
function Test-CommandExists {
    param ($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Function to start a process in a new window
function Start-ProcessInNewWindow {
    param (
        [string]$WorkingDirectory,
        [string]$Command,
        [string]$WindowTitle
    )
    
    Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$WorkingDirectory'; $Command; Write-Host 'Press any key to exit...'; [Console]::ReadKey()" -WorkingDirectory $WorkingDirectory -WindowStyle Normal
}

# Check Python installation
if (-not (Test-CommandExists python)) {
    Write-Host "Python is not installed or not in PATH. Please install Python 3.8 or higher." -ForegroundColor Red
    exit 1
}

# Check Node.js installation
if (-not (Test-CommandExists node)) {
    Write-Host "Node.js is not installed or not in PATH. Please install Node.js v14 or higher." -ForegroundColor Red
    exit 1
}

# Check npm installation
if (-not (Test-CommandExists npm)) {
    Write-Host "npm is not installed or not in PATH. Please install npm." -ForegroundColor Red
    exit 1
}

# Get the current directory
$rootDir = Get-Location

# Define paths
$frontendDir = Join-Path -Path $rootDir -ChildPath "frontend\web"
$backendDir = Join-Path -Path $rootDir -ChildPath "model"

# Check if directories exist
if (-not (Test-Path $frontendDir)) {
    Write-Host "Frontend directory not found at: $frontendDir" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $backendDir)) {
    Write-Host "Backend directory not found at: $backendDir" -ForegroundColor Red
    exit 1
}

# Display startup message
Write-Host "Starting ABDOS servers..." -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend API will be available at: http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C in each window to stop the servers when done." -ForegroundColor Yellow
Write-Host ""

# Start the backend server in a new window
Write-Host "Starting backend server..." -ForegroundColor Cyan
Start-ProcessInNewWindow -WorkingDirectory $backendDir -Command "python model_api.py" -WindowTitle "ABDOS Backend"

# Wait a moment to ensure backend starts first
Start-Sleep -Seconds 2

# Start the frontend server in a new window
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Start-ProcessInNewWindow -WorkingDirectory $frontendDir -Command "npm run dev" -WindowTitle "ABDOS Frontend"

Write-Host "Servers started in separate windows." -ForegroundColor Green
Write-Host "You can close this window now." -ForegroundColor Gray 