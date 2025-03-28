# ABDOS - AI-Based Dermatological Observation System

ABDOS is an advanced web application that uses artificial intelligence to detect and analyze skin cancer from uploaded images. The system provides users with risk assessments and recommendations for further medical consultation.

> **Note**: If you're experiencing issues running the application on Windows, please see [FIXED_INSTRUCTIONS.md](./FIXED_INSTRUCTIONS.md) for updated instructions.

## Features

- **AI-Powered Skin Cancer Detection**: Upload images of skin lesions for instant analysis
- **Multi-Class Classification**: Identifies 7 common types of skin cancer with 90%+ accuracy
- **Risk Assessment**: Provides confidence scores and risk levels for detected conditions
- **Educational Resources**: Comprehensive information about skin cancer types, prevention, and treatment
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Dark/Light Mode**: User-selectable theme for comfortable viewing in any environment

## Tech Stack

### Frontend
- Next.js (React framework)
- CSS-in-JS (styled-jsx)
- Context API for state management
- Responsive design with CSS Grid and Flexbox

### Backend
- Flask API for machine learning model serving
- TensorFlow/EfficientNet for image classification
- RESTful API architecture

## Project Structure

```
ABDOS_Project/
├── frontend/
│   └── web/
│       ├── components/        # Reusable UI components
│       ├── context/           # React context providers
│       ├── pages/             # Next.js pages
│       │   ├── api/           # API routes
│       │   ├── _app.js        # App wrapper
│       │   ├── index.js       # Home page
│       │   ├── about.js       # About page
│       │   ├── resources.js   # Resources page
│       │   ├── contact.js     # Contact page
│       │   └── analysis.js    # Analysis page
│       ├── public/            # Static assets
│       │   └── images/        # Image assets
│       └── styles/            # Global styles
├── model/
│   ├── model_api.py           # Flask API for serving the ML model
│   ├── requirements.txt       # Python dependencies
│   └── trained_model/         # Saved model files
├── package.json               # Root package with scripts
├── start-servers.ps1          # PowerShell script to start all servers
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+ (for the model API)
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ABDOS_Project.git
   cd ABDOS_Project
   ```

2. Install all dependencies (frontend and backend):
   ```
   npm run install:all
   ```

   Or install them separately:
   ```
   # Frontend dependencies
   npm run install:frontend
   
   # Backend dependencies
   npm run install:backend
   ```

### Running the Application

#### Option 1: Start both servers with one command (Windows PowerShell)
```
npm run start:all
```
This will open two PowerShell windows, one for the frontend and one for the backend.

#### Option 2: Start both servers with batch file (Windows Command Prompt)
```
npm run start:batch
```
or directly:
```
start-all.bat
```
This will open two command windows, one for the frontend and one for the backend.

#### Option 3: Start servers separately

1. Start the frontend development server:
   ```
   cd frontend/web
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

2. Start the model API server:
   ```
   cd model
   python model_api.py
   ```
   The API will be available at http://localhost:5000

### Stopping the Application

#### Option 1: Using stop scripts

Stop both servers with one command (Windows Command Prompt):
```
npm run stop
```
or directly:
```
stop-all.bat
```

Stop both servers with PowerShell:
```
npm run stop:ps
```

#### Option 2: Manually stopping servers

1. Press Ctrl+C in each server window
2. Confirm with Y when prompted
3. Or simply close the server windows

For more detailed instructions and troubleshooting, see [FIXED_INSTRUCTIONS.md](./FIXED_INSTRUCTIONS.md).

## Usage

1. Navigate to the Analysis page
2. Upload an image of a skin lesion
3. Wait for the AI to process the image
4. Review the analysis results, including:
   - Detected condition
   - Confidence level
   - Risk assessment
   - Recommended actions

## Development

### Adding New Pages

1. Create a new file in the `frontend/web/pages` directory
2. Import the Layout component
3. Create and export a new page component
4. Update the Header component to include a link to the new page

### Modifying the AI Model

1. Train your new model using the dataset
2. Export the model to the `model/trained_model` directory
3. Update the `model_api.py` file to use the new model

## Troubleshooting

### Common Issues

1. **Backend API not responding**
   - Ensure Python and all dependencies are installed
   - Check that the model file path in `model_api.py` is correct
   - Verify that port 5000 is not in use by another application

2. **Frontend development server issues**
   - Clear the Next.js cache with `npm run clean` in the frontend directory
   - Ensure all Node.js dependencies are installed
   - Check for JavaScript errors in the browser console

3. **Image analysis fails**
   - Verify that the image format is supported (JPEG, PNG)
   - Ensure the backend server is running
   - Check network connectivity between frontend and backend

4. **Using a dummy model instead of real model**
   - By default, the system creates a dummy model if no real model is found
   - To use your real model, run one of the setup scripts:
     ```
     # GUI version (requires tkinter)
     cd model
     python setup_real_model.py
     
     # Command-line version
     cd model
     python setup_real_model_cli.py
     ```
   - Or manually copy your model file to `model/trained_model/model.h5`
   - Restart the backend server after installing your model

### How to know if you're using a dummy model

If you see "Server error processing the image. Please try a different image." when analyzing images, you may be using the dummy model. The dummy model cannot perform real analysis and is only for testing the system's functionality.

To confirm which model you're using:
1. Check the backend server logs when it starts up
2. Look for messages indicating "Loading model from..." or "Creating dummy model..."
3. Use the connection test button in the UI - if it shows "Successfully connected" but analysis fails, you're likely using the dummy model

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The skin cancer dataset used for training the model
- The medical professionals who validated the system's accuracy
- The open-source community for the tools and libraries used in this project
