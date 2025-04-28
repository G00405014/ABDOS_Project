# ABDOS Project - Skin Cancer Detection and Analysis System

## Project Overview

ABDOS is a full-stack web application designed for skin lesion analysis and skin cancer detection. The system combines a Python/Flask backend with a Node.js/React frontend to provide a user-friendly interface for uploading skin lesion images, analyzing them using trained machine learning models, and generating comprehensive reports.

## Key Features

- **Image Analysis:** Upload and analyze skin lesion images
- **Machine Learning Classification:** Uses a MobileNetV2-based model to classify skin lesions into 7 categories
- **User Authentication:** Secure login/registration system
- **Dashboard:** Personalized dashboard to track analysis history
- **Report Generation:** PDF reports with detailed analysis results
- **Responsive UI:** Modern interface that works across devices

## Technology Stack

- **Backend:** 
  - Node.js/Express.js for API endpoints
  - Python/Flask for ML model serving
  - MongoDB for data storage
- **Frontend:** 
  - React (Next.js)
  - TailwindCSS for styling
- **Machine Learning:**
  - TensorFlow/Keras for model implementation
  - MobileNetV2 architecture for image classification
- **Authentication:** JWT-based auth system
- **Deployment:** Configured for Heroku deployment

## Project Structure

```
.
├── backend/                # Express.js backend and Flask ML API
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication middleware  
│   ├── models/             # Database schemas
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic services
│   ├── model_api.py        # Flask API for ML model
│   └── server.js           # Express server main file
├── frontend/
│   ├── web/                # Next.js React application
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Next.js pages and API routes
│   │   └── services/       # Frontend service modules
│   └── mobile/             # Mobile app (placeholder)
├── model/                  # ML model files
│   └── trained_model/      # Trained model weights
├── docs/                   # Documentation
├── data/                   # Data processing scripts and datasets
├── uploads/                # Temporary storage for uploaded images
├── start-servers-flask.ps1 # Script to start Flask server
├── stop-servers-flask.ps1  # Script to stop Flask server
└── skin_cancer_predictor.py # Standalone prediction tool
```

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- Python (v3.7+)
- MongoDB
- Git

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd abdos-project
   ```

2. **Install Dependencies:**
   ```bash
   # Install root and frontend dependencies
   npm run install-all
   
   # Install backend Python dependencies
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

3. **Configure Environment Variables:**
   - Create `.env` file in the backend directory
   - Create `.env.local` file in the frontend/web directory
   - Example configurations can be found in the respective READMEs

4. **Setup MongoDB:**
   - Ensure MongoDB is running locally or configure remote connection
   - Update MongoDB URI in backend/.env file

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the Flask model API:**
   ```bash
   # From project root
   powershell -ExecutionPolicy Bypass -File .\start-servers-flask.ps1
   ```

3. **Start the frontend development server:**
   ```bash
   # From project root
   npm run dev
   ```

4. Access the application at http://localhost:3000

### Stopping Servers

```bash
# Stop Flask server
powershell -ExecutionPolicy Bypass -File .\stop-servers-flask.ps1
```

## Skin Lesion Classification

The system can identify 7 different skin conditions:

| Class Code | Condition | Risk Level |
|------------|-----------|------------|
| akiec | Actinic Keratoses | Moderate |
| bcc | Basal Cell Carcinoma | High |
| bkl | Benign Keratosis | Low |
| df | Dermatofibroma | Low |
| mel | Melanoma | Very High |
| nv | Melanocytic Nevi (moles) | Low |
| vasc | Vascular Lesions | Low |

## Deployment

The application is configured for Heroku deployment with the included Procfile.

## Important Disclaimer

This tool is for educational and informational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider for medical conditions.

## License

This project is licensed under the terms of the license included in the LICENSE file.

## Contributing

Please see the CONTRIBUTING.md file for guidelines on how to contribute to this project.
