# Fixed Instructions for Running ABDOS Project

This document provides updated instructions for running the ABDOS project on Windows with PowerShell.

## Common Issues Fixed

1. **PowerShell Command Chaining**: Windows PowerShell doesn't support the `&&` operator for command chaining like bash. We've updated all scripts to use PowerShell-compatible syntax.

2. **Next.js Permission Errors**: The error `EPERM: operation not permitted, open '.next/trace'` has been addressed with a cleaning script.

3. **Model Path Flexibility**: The backend now tries multiple possible locations for the model file and creates a dummy model for testing if none is found.

## Running the Application

### Option 1: Start Both Servers (Recommended)

Using PowerShell:
```powershell
npm run start:all
```

Using Command Prompt (batch file):
```cmd
npm run start:batch
```
or directly:
```cmd
start-all.bat
```

This will open two windows:
- One running the frontend server (Next.js)
- One running the backend server (Flask)

### Option 2: Start Servers Separately

Start the frontend:
```powershell
npm run start:frontend
```

Start the backend:
```powershell
npm run start:backend
```

### Option 3: Clean and Start (If You Encounter Errors)

If you encounter permission errors or other issues with Next.js:

```powershell
npm run clean       # Clean the Next.js cache
npm run dev:clean   # Clean and then start the development server
```

## Stopping the Servers

### Option 1: Using the Stop Scripts

Using Command Prompt (batch file):
```cmd
npm run stop
```
or directly:
```cmd
stop-all.bat
```

Using PowerShell:
```powershell
npm run stop:ps
```

### Option 2: Manually Closing the Windows

You can also manually close the server windows:
1. Click the X button in the top-right corner of each window
2. Or press Ctrl+C in each window, then Y to confirm

### Option 3: Using Task Manager

1. Press Ctrl+Shift+Esc to open Task Manager
2. Find the Node.js and Python processes
3. Select them and click "End task"

## Troubleshooting

### If the Frontend Fails to Start

1. Try cleaning the Next.js cache:
   ```powershell
   npm run clean
   ```

2. Make sure no other Next.js processes are running:
   ```powershell
   Get-Process -Name "node" | Where-Object { $_.CommandLine -like "*next*" } | Stop-Process -Force
   ```

3. Try starting with a clean cache:
   ```powershell
   npm run dev:clean
   ```

### If the Backend Fails to Start

1. Check if Python and required packages are installed:
   ```powershell
   python --version
   pip list
   ```

2. Install backend dependencies:
   ```powershell
   npm run install:backend
   ```

3. Check if port 5000 is already in use:
   ```powershell
   netstat -ano | findstr :5000
   ```

4. If port 5000 is in use, you can modify the port in `model/model_api.py`.

### If Image Analysis Fails

1. Make sure both frontend and backend servers are running
2. Check the backend logs for errors
3. Verify that the image format is supported (JPEG, PNG)
4. Try using a different image

## Using Your Real Model

By default, the system creates a dummy model if no real model is found. This dummy model cannot perform real analysis and will return errors when analyzing images.

### Setting Up Your Real Model

#### Option 1: Using the Setup Scripts (Recommended)

Using PowerShell:
```powershell
npm run setup:model
```

Using Command Prompt (batch file):
```cmd
npm run setup:model:bat
```
or directly:
```cmd
setup-real-model.bat
```

These scripts will guide you through the process of selecting your real model file and installing it in the correct location.

#### Option 2: Manual Installation

1. Create the directory `model/trained_model` if it doesn't exist
2. Copy your model file to `model/trained_model/model.h5`
3. Restart the backend server

### Verifying Your Model

To verify that you're using your real model:

1. Start the backend server and check the logs
   - Look for "Loading model from: [path]" instead of "Creating dummy model"
   
2. Use the "Test Backend Connection" button in the UI
   - If it shows "Successfully connected" but analysis still fails, you may still be using the dummy model

3. Try analyzing an image
   - If you get detailed results instead of an error, your real model is working

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/

## Testing the API

You can test the backend API directly using the provided test script:

```powershell
cd model
python test_api.py
```

Or with a specific image:

```powershell
python test_api.py --image path/to/your/image.jpg
``` 