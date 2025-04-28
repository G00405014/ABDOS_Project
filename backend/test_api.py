import requests
import os
from PIL import Image
import json

def create_test_image(path='test_image.jpg', size=(224, 224)):
    """Create a simple test image"""
    img = Image.new('RGB', size, color=(73, 109, 137))
    img.save(path)
    return path

def test_api(url="http://localhost:5000/predict", use_node_backend=False):
    """Test the Flask API with a test image"""
    print("Creating test image...")
    image_path = create_test_image()
    
    if use_node_backend:
        # Test through Node.js backend
        target_url = "http://localhost:3001/api/analyze"
        print(f"Testing via Node.js backend: {target_url}")
    else:
        # Test direct to Flask
        target_url = url
        print(f"Testing direct to Flask API: {target_url}")
    
    print(f"Sending image {image_path} to {target_url}")
    
    with open(image_path, 'rb') as f:
        if use_node_backend:
            # For Node.js backend
            files = {'image': (os.path.basename(image_path), f, 'image/jpeg')}
        else:
            # For direct Flask API
            files = {'image': (os.path.basename(image_path), f, 'image/jpeg')}
        
        try:
            print("Sending request with the following files:", files.keys())
            response = requests.post(target_url, files=files)
            
            print(f"Status code: {response.status_code}")
            print(f"Response headers: {json.dumps(dict(response.headers), indent=2)}")
            
            if response.status_code == 200:
                print("Success! Response:")
                try:
                    print(json.dumps(response.json(), indent=2))
                except:
                    print(response.text)
            else:
                print("Failed. Response:")
                try:
                    print(json.dumps(response.json(), indent=2))
                except:
                    print(response.text)
                    
        except Exception as e:
            print(f"Error: {e}")
    
    print("Cleaning up test image...")
    if os.path.exists(image_path):
        os.remove(image_path)

if __name__ == "__main__":
    # Test direct to Flask
    print("\n=== Testing direct to Flask API ===")
    test_api()
    
    # Test via Node.js backend
    print("\n=== Testing via Node.js backend ===")
    test_api(use_node_backend=True) 