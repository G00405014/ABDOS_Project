# ============================================================
# Skin Cancer Detection API Testing Script
# ============================================================
# This script helps test the skin cancer detection API by:
# 1. Checking if the API server is running (health check)
# 2. Testing image prediction with a provided image file
# 3. Displaying detailed results from the API

import requests
import os
import argparse
import sys
from PIL import Image
import io
import time

def test_api_with_image(image_path, api_url="http://localhost:5000/predict"):
    """
    Test the skin cancer detection API with a provided image
    
    Args:
        image_path: Path to the image file to test
        api_url: URL of the API's prediction endpoint
        
    Returns:
        bool: True if test was successful, False otherwise
    """
    # Make sure the image file exists
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}")
        return False
    
    print(f"Testing API with image: {image_path}")
    print(f"API endpoint: {api_url}")
    
    # Check and process the image before sending
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            print(f"Image dimensions: {width} x {height} pixels")
            print(f"Image format: {img.format}")
            
            # If image is too large, resize it to prevent long upload times
            max_dim = 1000
            if width > max_dim or height > max_dim:
                print(f"Image is large. Resizing to maximum dimension of {max_dim} pixels")
                # Keep aspect ratio when resizing
                if width > height:
                    new_width = max_dim
                    new_height = int(height * (max_dim / width))
                else:
                    new_height = max_dim
                    new_width = int(width * (max_dim / height))
                
                img = img.resize((new_width, new_height))
                print(f"Resized to: {new_width} x {new_height} pixels")
                
                # Save the resized image temporarily
                temp_path = "resized_" + os.path.basename(image_path)
                img.save(temp_path)
                image_path = temp_path
                print(f"Saved resized image to: {temp_path}")
    
    except Exception as e:
        print(f"Error processing image: {e}")
        return False
    
    # Send the image to the API for prediction
    try:
        print("\nSending request to API...")
        start_time = time.time()
        
        # Upload the image file
        with open(image_path, "rb") as f:
            files = {"image": (os.path.basename(image_path), f, "image/jpeg")}
            response = requests.post(api_url, files=files)
        
        elapsed = time.time() - start_time
        print(f"Request completed in {elapsed:.2f} seconds")
        
        # Display the API's response
        print("\nAPI Response:")
        print("-" * 50)
        
        if response.status_code == 200:
            result = response.json()
            
            # Show basic information about the prediction
            print(f"Status: Success (200 OK)")
            
            # Display the predicted skin condition
            if "label" in result:
                print(f"Predicted condition: {result['label']}")
            elif "class_name" in result:
                print(f"Predicted condition: {result['class_name']}")
                
            # Show how confident the model is in its prediction
            if "confidence" in result:
                print(f"Confidence: {result['confidence']:.2f}%")
            
            if "predicted_class" in result:
                print(f"Class index: {result['predicted_class']}")
            
            # If available, show probabilities for all possible conditions
            if "original_probabilities" in result:
                print("\nClass probabilities:")
                probs = result["original_probabilities"]
                for class_name, prob in probs.items():
                    print(f"  {class_name}: {prob:.2f}%")
            
            # Show the complete raw response for debugging
            print("\nRaw response:")
            for key, value in result.items():
                print(f"  {key}: {value}")
            
            return True
        else:
            # Handle error responses
            print(f"Status: Error ({response.status_code})")
            try:
                error_data = response.json()
                print(f"Error: {error_data.get('error', 'Unknown error')}")
                print(f"Details: {error_data.get('details', 'No details provided')}")
            except:
                print(f"Response text: {response.text}")
            
            return False
    
    except Exception as e:
        print(f"Error sending request: {e}")
        return False
    
    finally:
        # Clean up any temporary files we created
        if image_path.startswith("resized_") and os.path.exists(image_path):
            try:
                os.remove(image_path)
                print(f"Removed temporary file: {image_path}")
            except:
                pass

def check_health_endpoint(api_url="http://localhost:5000/health"):
    """
    Check if the API server is running and the model is loaded
    
    Args:
        api_url: URL of the API's health endpoint
        
    Returns:
        bool: True if API is healthy, False otherwise
    """
    try:
        print(f"Checking API health at: {api_url}")
        response = requests.get(api_url)
        
        if response.status_code == 200:
            result = response.json()
            print("API is running!")
            print(f"Status: {result.get('status', 'unknown')}")
            
            # Verify that the model is loaded and ready
            model_loaded = result.get('model_loaded', False)
            if model_loaded:
                print("Model is loaded successfully.")
            else:
                print("WARNING: Model is not loaded properly!")
            
            # Show any additional information from the API
            if 'message' in result:
                print(f"Message: {result['message']}")
            
            return True
        else:
            print(f"Health check failed with status code: {response.status_code}")
            return False
    
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to API. Make sure the server is running.")
        return False
    except Exception as e:
        print(f"Error checking API health: {e}")
        return False

def main():
    """
    Main function to handle command-line arguments and run tests
    
    Usage:
        # Check if API is running:
        python test_api_with_model.py --health
        
        # Test with an image:
        python test_api_with_model.py --image path/to/image.jpg
        
        # Test with custom API URL:
        python test_api_with_model.py --image path/to/image.jpg --url http://api.example.com/predict
    """
    # Set up command-line argument parsing
    parser = argparse.ArgumentParser(description="Test the skin cancer detection API")
    parser.add_argument("--image", type=str, help="Path to image file to test")
    parser.add_argument("--url", type=str, default="http://localhost:5000/predict", 
                        help="URL of the API prediction endpoint")
    parser.add_argument("--health", action="store_true", 
                        help="Check API health endpoint instead of making a prediction")
    
    args = parser.parse_args()
    
    if args.health:
        # For health check, modify the URL to point to the health endpoint
        if args.url.endswith('/predict'):
            health_url = args.url.replace('/predict', '/health')
        else:
            health_url = args.url.rsplit('/', 1)[0] + '/health'
        
        success = check_health_endpoint(health_url)
    else:
        # For prediction test, make sure an image was provided
        if not args.image:
            print("Error: You must provide an image path with --image")
            parser.print_help()
            sys.exit(1)
        
        success = test_api_with_image(args.image, args.url)
    
    # Exit with appropriate status code
    if success:
        print("\nTest completed successfully!")
        sys.exit(0)
    else:
        print("\nTest failed.")
        sys.exit(1)

if __name__ == "__main__":
    main() 