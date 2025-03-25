# PowerShell script to start TensorFlow Serving
# This script starts TensorFlow Serving using Docker

# Get the current directory
$projectRoot = Split-Path -Parent $PSCommandPath
$modelPath = Join-Path $projectRoot "models"

Write-Host "Starting TensorFlow Serving..." -ForegroundColor Green
Write-Host "Model Base Path: $modelPath" -ForegroundColor Yellow

# Check if Docker is running
try {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Docker is not running. Please start Docker and try again." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error: Docker is not installed or not accessible. Please install Docker and try again." -ForegroundColor Red
    exit 1
}

# Make sure the model directory exists
if (-not (Test-Path $modelPath)) {
    Write-Host "Error: Model directory not found: $modelPath" -ForegroundColor Red
    exit 1
}

# Stop any existing TensorFlow Serving containers
docker ps -a | Select-String "tf_serving_skin_condition" | ForEach-Object {
    $containerId = $_.ToString().Split()[0]
    Write-Host "Stopping existing TensorFlow Serving container: $containerId" -ForegroundColor Yellow
    docker stop $containerId 2>&1 | Out-Null
}

# Pull TensorFlow Serving image if needed
Write-Host "Pulling TensorFlow Serving Docker image..." -ForegroundColor Cyan
docker pull tensorflow/serving

# Start TensorFlow Serving container
Write-Host "Starting TensorFlow Serving container..." -ForegroundColor Cyan
$containerCommand = "docker run -d --rm --name tf_serving_skin_condition " +
                   "-p 8501:8501 -p 8500:8500 " +
                   "-v `"${modelPath}:/models`" " +
                   "-e MODEL_NAME=skin_condition " +
                   "tensorflow/serving"

Write-Host "Running command: $containerCommand" -ForegroundColor Gray
Invoke-Expression $containerCommand

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error starting TensorFlow Serving container." -ForegroundColor Red
    exit 1
}

Write-Host "TensorFlow Serving started successfully!" -ForegroundColor Green
Write-Host "REST API available at: http://localhost:8501/v1/models/skin_condition" -ForegroundColor Green
Write-Host "gRPC API available at: localhost:8500" -ForegroundColor Green
Write-Host "To stop the container, run: docker stop tf_serving_skin_condition" -ForegroundColor Yellow 