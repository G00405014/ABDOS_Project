from flask import Flask, request, jsonify
import time
import numpy as np
import os

app = Flask(__name__)

# Define the possible conditions (matches your model's classes)
CONDITIONS = [
    'Actinic Keratoses',
    'Basal Cell Carcinoma',
    'Benign Keratosis',
    'Dermatofibroma',
    'Melanoma',
    'Melanocytic Nevi',
    'Vascular Lesions'
]

@app.route('/', methods=['GET'])
def home():
    return "Test Predictor API is running. Send POST requests to /predict"

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running"""
    return jsonify({
        'status': 'healthy',
        'message': 'Test Predictor API is running',
        'model_loaded': True
    })

@app.route('/predict', methods=['POST'])
def predict():
    print("=== TEST PREDICTOR RECEIVED REQUEST ===")
    
    # Verify image was sent
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    # Get the image file
    file = request.files['image']
    print(f"Received image: {file.filename}")
    
    # Use current time to cycle through all possible classes
    # This guarantees a different class each time (approximately)
    current_time = int(time.time())
    class_index = current_time % len(CONDITIONS)
    
    # Get condition name
    condition = CONDITIONS[class_index]
    
    # Create random probabilities for all classes
    probabilities = np.zeros(len(CONDITIONS))
    # Give highest probability to the selected class
    probabilities[class_index] = 0.7 + np.random.rand() * 0.2  # Between 70-90% confidence
    
    # Distribute remaining probability among other classes
    remaining = 1.0 - probabilities[class_index]
    for i in range(len(CONDITIONS)):
        if i != class_index:
            # Random share of remaining probability
            share = np.random.rand()
            probabilities[i] = share
    
    # Normalize to ensure sum is 1.0
    probabilities = probabilities / np.sum(probabilities)
    
    # Convert to percentage and round
    all_probabilities = {}
    for i, cond in enumerate(CONDITIONS):
        all_probabilities[cond] = round(float(probabilities[i] * 100), 2)
    
    print(f"TEST PREDICTOR: Returning {condition} with {all_probabilities[condition]}% confidence")
    
    # Return prediction
    return jsonify({
        'predicted_class': int(class_index),
        'confidence': all_probabilities[condition],
        'label': condition,
        'original_probabilities': all_probabilities,
        'adjusted_probabilities': all_probabilities,
        'is_test': True,
        'message': 'This is a test prediction that cycles through all possible classes'
    })

if __name__ == '__main__':
    # Use port 5000 to match your original API
    port = int(os.environ.get('PORT', 5000))
    print(f"=== STARTING TEST PREDICTOR ON PORT {port} ===")
    print(f"This will cycle through all {len(CONDITIONS)} classes, one per request")
    app.run(host='0.0.0.0', port=port, debug=True) 