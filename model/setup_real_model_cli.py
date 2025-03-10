import os
import shutil
import sys

def setup_model_cli(model_path=None):
    """
    Set up the real model from a command line interface
    
    Args:
        model_path: Optional path to the model file. If not provided, user will be prompted.
    """
    # Create the trained_model directory if it doesn't exist
    model_dir = os.path.join(os.path.dirname(__file__), "trained_model")
    os.makedirs(model_dir, exist_ok=True)
    
    # Path for the real model
    dest_path = os.path.join(model_dir, "model.h5")
    
    # Check if dummy model exists and rename it
    dummy_path = os.path.join(model_dir, "dummy_model.h5")
    if os.path.exists(dummy_path):
        print(f"Found dummy model at {dummy_path}")
        backup_path = os.path.join(model_dir, "dummy_model.backup.h5")
        if os.path.exists(backup_path):
            os.remove(backup_path)
        os.rename(dummy_path, backup_path)
        print(f"Renamed dummy model to {backup_path}")
    
    # If model path is not provided, prompt the user
    if not model_path:
        print("\n=== ABDOS Real Model Setup ===")
        print("Please enter the full path to your real model file (.h5 format):")
        print("Example: C:\\Users\\YourName\\Downloads\\model.h5")
        model_path = input("> ").strip()
    
    if not model_path:
        print("No path provided. Operation cancelled.")
        return False
    
    # Check if the file exists
    if not os.path.exists(model_path):
        print(f"Error: File not found at {model_path}")
        return False
    
    # Copy the selected file to the model directory
    try:
        shutil.copy2(model_path, dest_path)
        print(f"Successfully copied {model_path} to {dest_path}")
        print("\nYour model has been successfully installed!")
        print(f"Source: {model_path}")
        print(f"Destination: {dest_path}")
        print("\nPlease restart the backend server for the changes to take effect.")
        return True
    except Exception as e:
        print(f"Error copying file: {str(e)}")
        print("Please make sure you have permission to write to the destination folder.")
        return False

if __name__ == "__main__":
    # Check if a path was provided as a command line argument
    model_path = sys.argv[1] if len(sys.argv) > 1 else None
    
    print("Setting up real model...")
    success = setup_model_cli(model_path)
    
    if success:
        print("Model setup complete. Please restart the backend server.")
    else:
        print("Model setup failed or was cancelled.") 