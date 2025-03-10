import os
import shutil
import sys
import tkinter as tk
from tkinter import filedialog, messagebox

def setup_model():
    # Create the trained_model directory if it doesn't exist
    model_dir = os.path.join(os.path.dirname(__file__), "trained_model")
    os.makedirs(model_dir, exist_ok=True)
    
    # Path for the real model
    model_path = os.path.join(model_dir, "model.h5")
    
    # Check if dummy model exists and rename it
    dummy_path = os.path.join(model_dir, "dummy_model.h5")
    if os.path.exists(dummy_path):
        print(f"Found dummy model at {dummy_path}")
        backup_path = os.path.join(model_dir, "dummy_model.backup.h5")
        if os.path.exists(backup_path):
            os.remove(backup_path)
        os.rename(dummy_path, backup_path)
        print(f"Renamed dummy model to {backup_path}")
    
    # Initialize tkinter
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    
    # Show a message to the user
    messagebox.showinfo(
        "Select Your Real Model", 
        "Please select your real model file (.h5 format).\n\n"
        "The file will be copied to the correct location for the application to use."
    )
    
    # Open file dialog to select the model file
    file_path = filedialog.askopenfilename(
        title="Select Your Real Model File",
        filetypes=[("H5 Files", "*.h5"), ("All Files", "*.*")]
    )
    
    if not file_path:
        print("No file selected. Operation cancelled.")
        messagebox.showinfo("Operation Cancelled", "No file was selected. The application will continue to use the dummy model.")
        return False
    
    # Copy the selected file to the model directory
    try:
        shutil.copy2(file_path, model_path)
        print(f"Successfully copied {file_path} to {model_path}")
        messagebox.showinfo(
            "Success", 
            f"Your model has been successfully installed!\n\n"
            f"Source: {file_path}\n"
            f"Destination: {model_path}\n\n"
            "Please restart the backend server for the changes to take effect."
        )
        return True
    except Exception as e:
        print(f"Error copying file: {str(e)}")
        messagebox.showerror(
            "Error", 
            f"Failed to copy the model file:\n{str(e)}\n\n"
            "Please make sure you have permission to write to the destination folder."
        )
        return False

if __name__ == "__main__":
    print("Setting up real model...")
    success = setup_model()
    if success:
        print("Model setup complete. Please restart the backend server.")
    else:
        print("Model setup failed or was cancelled.") 