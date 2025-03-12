# ABDOS Project Shutdown Script
# This script stops all running instances of the backend and frontend servers

Write-Host "Stopping ABDOS Project..." -ForegroundColor Yellow
Write-Host "------------------------------" -ForegroundColor Yellow

# Stop TensorFlow Serving (Docker container or process)
Write-Host "Stopping TensorFlow Serving..." -ForegroundColor Cyan
# Check if the Docker container is running
$containerRunning = docker ps -q -f name=tf_serving_skin_condition

if ($containerRunning) {
    # Stop the Docker container
    Write-Host "Stopping TensorFlow Serving Docker container..." -ForegroundColor Cyan
    docker stop tf_serving_skin_condition
    Write-Host "TensorFlow Serving Docker container stopped." -ForegroundColor Green
} else {
    # Check for direct process
    $tfProcess = Get-Process -Name "tensorflow_model_server" -ErrorAction SilentlyContinue
    
    if ($tfProcess) {
        # Stop the direct process
        Write-Host "Stopping TensorFlow Serving process..." -ForegroundColor Cyan
        Stop-Process -Name "tensorflow_model_server" -Force
        Write-Host "TensorFlow Serving process stopped." -ForegroundColor Green
    } else {
        Write-Host "No running TensorFlow Serving instance found." -ForegroundColor Yellow
    }
}

# Stop Express backend server
Write-Host "Stopping Express backend server..." -ForegroundColor Cyan
Get-Process -Name "node" | Where-Object { $_.CommandLine -like "*backend*" -and $_.CommandLine -notlike "*next*" } | ForEach-Object {
    Write-Host "Stopping Node.js process with ID: $($_.Id)" -ForegroundColor Gray
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