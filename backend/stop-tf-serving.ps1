# PowerShell script to stop TensorFlow Serving container

Write-Host "Stopping TensorFlow Serving..." -ForegroundColor Yellow

# Check if the container is running
$containerExists = docker ps -a --filter "name=tf_serving_skin_condition" --format "{{.ID}}"

if ($containerExists) {
    # Stop the TensorFlow Serving container
    Write-Host "Stopping TensorFlow Serving container..." -ForegroundColor Cyan
    docker stop tf_serving_skin_condition
    
    Write-Host "TensorFlow Serving container stopped." -ForegroundColor Green
} else {
    Write-Host "No TensorFlow Serving container found to stop." -ForegroundColor Yellow
}

# Check for any orphaned TensorFlow Serving processes (in case of non-Docker deployment)
$tfServingProcesses = Get-Process -Name "tensorflow_model_server" -ErrorAction SilentlyContinue

if ($tfServingProcesses) {
    Write-Host "Found TensorFlow Serving processes running directly (not in Docker)." -ForegroundColor Yellow
    
    foreach ($process in $tfServingProcesses) {
        Write-Host "Stopping process with ID $($process.Id)..." -ForegroundColor Cyan
        Stop-Process -Id $process.Id -Force
    }
    
    Write-Host "All TensorFlow Serving processes stopped." -ForegroundColor Green
}

Write-Host "Done." -ForegroundColor Green 