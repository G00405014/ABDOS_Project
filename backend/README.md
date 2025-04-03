# ABDOS Backend

This is the backend for the AI-Based Dermatological Observation System (ABDOS).

## Requirements

- Python 3.10+
- TensorFlow 2.16+

## Installation

```bash
# Create a virtual environment (recommended)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask API server
python model_api.py

# Start the Node.js server (if using)
npm install
node server.js
```

## API Endpoints

### Skin Lesion Analysis
- **POST /predict**
  - Upload an image for skin lesion analysis
  - Returns classification results

## Models

The system uses a fine-tuned MobileNet model trained on the HAM10000 dataset for skin lesion classification. 
