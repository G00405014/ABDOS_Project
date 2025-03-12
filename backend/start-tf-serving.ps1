# PowerShell script to start TensorFlow Serving
# Note: This script assumes you have TensorFlow Serving installed and in your PATH
# You can install TensorFlow Serving using Docker if not installed directly

# Get the current directory
$projectRoot = Split-Path -Parent $PSCommandPath
$modelConfigPath = Join-Path $projectRoot "models\model_config.config"
$modelPath = Join-Path $projectRoot "models"

Write-Host "Starting TensorFlow Serving..." -ForegroundColor Green
Write-Host "Model Config Path: $modelConfigPath" -ForegroundColor Yellow
Write-Host "Model Base Path: $modelPath" -ForegroundColor Yellow

# Check if running in Docker or directly
$useDocker = $true

if ($useDocker) {
    # Using Docker
    Write-Host "Starting TensorFlow Serving with Docker..." -ForegroundColor Cyan
    
    # Make sure Docker is running
    docker info > $null 2>&1
    if (-not $?) {
        Write-Host "Error: Docker is not running. Please start Docker and try again." -ForegroundColor Red
        exit 1
    }
    
    # Pull TensorFlow Serving image if not already pulled
    docker pull tensorflow/serving
    
    # Start TensorFlow Serving container
    docker run -d --rm --name tf_serving_skin_condition `
        -p 8501:8501 -p 8500:8500 `
        -v "${modelPath}:/models/skin_condition" `
        -e MODEL_NAME=skin_condition `
        tensorflow/serving
    
    Write-Host "TensorFlow Serving started in Docker container." -ForegroundColor Green
    Write-Host "REST API available at: http://localhost:8501/v1/models/skin_condition" -ForegroundColor Green
    Write-Host "To stop the container, run: docker stop tf_serving_skin_condition" -ForegroundColor Yellow
} else {
    # Direct execution - requires TensorFlow Serving to be installed
    try {
        # Start TensorFlow Serving
        tensorflow_model_server --rest_api_port=8501 --model_config_file=$modelConfigPath
    } catch {
        Write-Host "Error starting TensorFlow Serving: $_" -ForegroundColor Red
        Write-Host "Make sure TensorFlow Serving is installed and in your PATH." -ForegroundColor Yellow
        Write-Host "You can install it via Docker as an alternative." -ForegroundColor Yellow
        exit 1
    }
} 