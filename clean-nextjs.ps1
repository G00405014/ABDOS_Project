# PowerShell script to clean Next.js cache
Write-Host "Cleaning Next.js cache..." -ForegroundColor Cyan

# Navigate to the frontend directory
Set-Location -Path "frontend/web"

# Stop any running Next.js processes
Write-Host "Stopping any running Next.js processes..." -ForegroundColor Yellow
$nextProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" }
if ($nextProcesses) {
    $nextProcesses | ForEach-Object { 
        Write-Host "Stopping process with ID: $($_.Id)" -ForegroundColor Yellow
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue 
    }
    Write-Host "Next.js processes stopped." -ForegroundColor Green
} else {
    Write-Host "No Next.js processes found running." -ForegroundColor Green
}

# Remove the .next directory
if (Test-Path -Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host ".next directory removed." -ForegroundColor Green
} else {
    Write-Host ".next directory not found." -ForegroundColor Yellow
}

# Remove the node_modules/.cache directory
if (Test-Path -Path "node_modules/.cache") {
    Write-Host "Removing node_modules/.cache directory..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "node_modules/.cache directory removed." -ForegroundColor Green
} else {
    Write-Host "node_modules/.cache directory not found." -ForegroundColor Yellow
}

Write-Host "Next.js cache cleaning completed." -ForegroundColor Cyan 