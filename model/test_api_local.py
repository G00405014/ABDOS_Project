import requests
import argparse
import os
import time
import json
from PIL import Image
import numpy as np
import random

def create_test_image(output_path="test_image.jpg", size=(224, 224)):
    """Create a simple test image with random colors"""
    # Create a random colored image
    img_array = np.random.randint(0, 255, (size[0], size[1], 3), dtype=np.uint8)
    img = Image.fromarray(img_array)
    img.save(output_path)
    print(f"Created test image: {output_path}")
    return output_path

def test_api(image_path=None, url="http://localhost:5000/predict"):
    """Test the skin cancer detection API with an image"""
    # If no image path is provided, create a test image
    if not image_path:
        image_path = create_test_image()
    
    # Ensure the image exists
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}")
        return
    
    print(f"Sending image {image_path} to {url}...")
    
    # Prepare the image file for upload
    with open(image_path, 'rb') as f:
        files = {'image': (os.path.basename(image_path), f, 'image/jpeg')}
        
        # Send the request and time it
        start_time = time.time()
        try:
            response = requests.post(url, files=files)
            elapsed = time.time() - start_time
            
            print(f"Request {'successful' if response.status_code == 200 else 'failed'}! Response time: {elapsed:.2f} seconds")
            print("\nAPI Response:")
            print("-" * 50)
            
            # Pretty print the response
            if response.status_code == 200:
                result = response.json()
                for key, value in result.items():
                    print(f"{key}: {value}")
            else:
                print(f"Status code: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error: {error_data.get('error', 'Unknown error')}")
                    print(f"Details: {error_data.get('details', 'No details provided')}")
                except:
                    print(f"Response text: {response.text}")
            
            print("-" * 50)
            
            if response.status_code == 200:
                print("\nAPI test completed successfully!")
            else:
                print("\nAPI test failed!")
                
            return response.status_code == 200
            
        except requests.exceptions.ConnectionError:
            print(f"Connection error: Could not connect to {url}")
            print("Make sure the API server is running.")
            return False
        except Exception as e:
            print(f"Error: {str(e)}")
            return False

def test_health_endpoint(url="http://localhost:5000/health"):
    """Test the health endpoint of the API"""
    try:
        response = requests.get(url)
        print(f"\nHealth check {'successful' if response.status_code == 200 else 'failed'}!")
        print("-" * 50)
        if response.status_code == 200:
            result = response.json()
            for key, value in result.items():
                print(f"{key}: {value}")
        else:
            print(f"Status code: {response.status_code}")
            print(f"Response text: {response.text}")
        print("-" * 50)
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        print(f"Connection error: Could not connect to {url}")
        print("Make sure the API server is running.")
        return False
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test the skin cancer detection API")
    parser.add_argument("--image", help="Path to the image file to test")
    parser.add_argument("--url", default="http://localhost:5000/predict", help="URL of the API endpoint")
    parser.add_argument("--health", action="store_true", help="Test the health endpoint")
    
    args = parser.parse_args()
    
    if args.health:
        test_health_endpoint()
    
    test_api(args.image, args.url) 