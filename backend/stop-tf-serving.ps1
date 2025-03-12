# PowerShell script to stop TensorFlow Serving

Write-Host "Stopping TensorFlow Serving..." -ForegroundColor Yellow

# Check if the Docker container is running
$containerRunning = docker ps -q -f name=tf_serving_skin_condition

if ($containerRunning) {
    # Stop the Docker container
    Write-Host "Stopping TensorFlow Serving Docker container..." -ForegroundColor Cyan
    docker stop tf_serving_skin_condition
    Write-Host "TensorFlow Serving Docker container stopped." -ForegroundColor Green
} else {
    # Check for direct process
    $process = Get-Process -Name "tensorflow_model_server" -ErrorAction SilentlyContinue
    
    if ($process) {
        # Stop the direct process
        Write-Host "Stopping TensorFlow Serving process..." -ForegroundColor Cyan
        Stop-Process -Name "tensorflow_model_server" -Force
        Write-Host "TensorFlow Serving process stopped." -ForegroundColor Green
    } else {
        Write-Host "No running TensorFlow Serving instance found." -ForegroundColor Yellow
    }
}

Write-Host "Done." -ForegroundColor Green 