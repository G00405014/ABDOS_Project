import requests
import os
import sys
import time
import argparse
from PIL import Image

def test_api(image_path=None, url="http://localhost:5000/predict"):
    """
    Test the Flask API by sending an image and receiving a prediction.
    
    Args:
        image_path: Path to the image file to test
        url: URL of the API endpoint
    """
    # Check if the API is running
    try:
        health_check = requests.get(url.replace('/predict', '/'))
        if health_check.status_code != 200:
            print(f"API is not responding correctly. Status code: {health_check.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Cannot connect to the API. Make sure the Flask server is running.")
        return False
    
    # If no image path is provided, use a sample image or create one
    if not image_path:
        # Try to find a sample image in the current directory
        for ext in ['.jpg', '.jpeg', '.png']:
            sample_files = [f for f in os.listdir('.') if f.endswith(ext)]
            if sample_files:
                image_path = sample_files[0]
                print(f"Using sample image: {image_path}")
                break
        
        # If no sample image found, create a test image
        if not image_path:
            print("No sample image found. Creating a test image...")
            test_image_path = 'test_image.jpg'
            img = Image.new('RGB', (224, 224), color = (73, 109, 137))
            img.save(test_image_path)
            image_path = test_image_path
            print(f"Created test image: {test_image_path}")
    
    # Check if the image exists
    if not os.path.exists(image_path):
        print(f"Image file not found: {image_path}")
        return False
    
    # Send the image to the API
    print(f"Sending image {image_path} to {url}...")
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': (os.path.basename(image_path), f, 'image/jpeg')}
            start_time = time.time()
            response = requests.post(url, files=files)
            end_time = time.time()
    except Exception as e:
        print(f"Error sending request: {e}")
        return False
    
    # Check the response
    if response.status_code == 200:
        print(f"Request successful! Response time: {end_time - start_time:.2f} seconds")
        print("\nAPI Response:")
        print("-" * 50)
        
        try:
            result = response.json()
            for key, value in result.items():
                print(f"{key}: {value}")
            
            print("-" * 50)
            return True
        except ValueError:
            print("Error parsing JSON response")
            print(f"Raw response: {response.text}")
            return False
    else:
        print(f"Request failed with status code {response.status_code}")
        print(f"Response: {response.text}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test the Flask API for skin cancer detection')
    parser.add_argument('--image', type=str, help='Path to the image file to test')
    parser.add_argument('--url', type=str, default="http://localhost:5000/predict", 
                        help='URL of the API endpoint')
    
    args = parser.parse_args()
    
    success = test_api(args.image, args.url)
    
    if success:
        print("\nAPI test completed successfully!")
        sys.exit(0)
    else:
        print("\nAPI test failed.")
        sys.exit(1) 