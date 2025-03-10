# PowerShell script to stop all ABDOS servers

Write-Host "Stopping ABDOS servers..." -ForegroundColor Cyan
Write-Host ""

$found = 0

# Stop Next.js processes
Write-Host "Stopping frontend server (Next.js)..." -ForegroundColor Yellow
$nextProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" }
if ($nextProcesses) {
    $nextProcesses | ForEach-Object { 
        Write-Host "Stopping process with ID: $($_.Id)" -ForegroundColor Yellow
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue 
    }
    Write-Host "Frontend server stopped successfully." -ForegroundColor Green
    $found++
} else {
    Write-Host "No frontend server found running." -ForegroundColor Yellow
}

# Stop Flask processes
Write-Host "Stopping backend server (Python/Flask)..." -ForegroundColor Yellow
$flaskProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*model_api.py*" }
if ($flaskProcesses) {
    $flaskProcesses | ForEach-Object { 
        Write-Host "Stopping process with ID: $($_.Id)" -ForegroundColor Yellow
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue 
    }
    Write-Host "Backend server stopped successfully." -ForegroundColor Green
    $found++
} else {
    Write-Host "No backend server found running." -ForegroundColor Yellow
}

Write-Host ""
if ($found -gt 0) {
    Write-Host "$found server(s) stopped successfully." -ForegroundColor Green
} else {
    Write-Host "No ABDOS servers were found running." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 