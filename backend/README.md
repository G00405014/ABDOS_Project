# ABDOS Project Backend

This backend uses Express.js for the main API and TensorFlow Serving for running machine learning model inference.

## Setup and Running

### Prerequisites

- Node.js (>= 14)
- Docker (for TensorFlow Serving)
- TensorFlow (for model conversion)

### Model Setup

1. Before using TensorFlow Serving, you need to convert your H5 model to the SavedModel format:

```bash
# From the project root directory
cd backend
python convert_model.py
```

This script will convert the model and save it in the proper format for TensorFlow Serving.

### Running the Backend

The project includes scripts for managing services:

1. **Starting TensorFlow Serving (Docker)**:
```bash
# From the backend directory
./start-tf-serving.ps1
```

2. **Starting the Express Backend**:
```bash
# From the backend directory
npm start
```

3. **Stopping TensorFlow Serving**:
```bash
# From the backend directory
./stop-tf-serving.ps1
```

Alternatively, you can start all services at once from the project root:
```bash
# From the project root
./start-servers.ps1
```

## API Endpoints

- `POST /api/analyze` - Analyze a skin image for condition detection
- `POST /api/report` - Generate a report

## Architecture

- **TensorFlow Serving** - Serves the machine learning model at port 8501
- **Express Backend** - Handles business logic, client requests, and communicates with TensorFlow Serving at port 3001 
