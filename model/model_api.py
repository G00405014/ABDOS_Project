from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
import logging
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS if frontend and backend are on different origins

# Class labels for the model
CLASS_LABELS = {
    0: 'Actinic Keratoses',
    1: 'Basal Cell Carcinoma',
    2: 'Benign Keratosis',
    3: 'Dermatofibroma',
    4: 'Melanoma',
    5: 'Melanocytic Nevi',
    6: 'Vascular Lesions'
}

# Load model on startup
try:
    # Try different possible model paths
    possible_model_paths = [
        r"C:\Users\User\Downloads\final_model_mobilenet.h5",  # New MobileNet model
        r"C:\Users\User\Downloads\model.h5",  # Original path
        os.path.join(os.path.dirname(__file__), "trained_model", "model.h5"),  # Relative to this file
        os.path.join("trained_model", "model.h5"),  # Relative to current directory
        os.path.abspath(os.path.join(os.getcwd(), "model.h5"))  # Absolute path in current directory
    ]
    
    model = None
    model_path = None
    
    # Try each path until we find a valid model
    for path in possible_model_paths:
        if os.path.exists(path):
            model_path = path
            logger.info(f"Found model at: {model_path}")
            break
    
    if model_path:
        logger.info(f"Loading model from: {model_path}")
        start_time = time.time()
        model = load_model(model_path)
        logger.info(f"Model loaded successfully in {time.time() - start_time:.2f} seconds")
    else:
        logger.warning("No model file found in any of the expected locations")
        logger.warning("API will start but predictions will fail")
        model = None
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

@app.route('/', methods=['GET'])
def index():
    """Serve the API documentation page"""
    return render_template('index.html', model_loaded=model is not None)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running"""
    status = {
        'status': 'healthy',
        'model_loaded': model is not None
    }
    return jsonify(status)

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint to predict skin cancer from an uploaded image"""
    # Check if model is loaded
    if model is None:
        logger.error("Prediction attempted but model is not loaded")
        return jsonify({
            'error': 'Model not loaded',
            'details': 'The model failed to load or the model file was not found'
        }), 503
    
    # Check if image was provided
    if 'image' not in request.files:
        logger.error("No image file found in the request")
        return jsonify({'error': 'No image provided'}), 400

    try:
        file = request.files['image']
        logger.info(f"Processing image: {file.filename}, Content type: {file.content_type}, Size: {file.content_length} bytes")
        
        # Validate image format
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            logger.error(f"Unsupported file format: {file.filename}")
            return jsonify({
                'error': 'Unsupported file format',
                'details': 'Only JPG, JPEG, and PNG images are supported'
            }), 400
        
        # Open and preprocess the image
        try:
            img = Image.open(file.stream).convert('RGB')
            logger.info(f"Image opened successfully. Size: {img.size}")
            img = img.resize((224, 224))
            img_array = np.array(img)/255.0
            img_array = np.expand_dims(img_array, axis=0)
            logger.info(f"Image preprocessed successfully. Array shape: {img_array.shape}")
        except Exception as img_error:
            logger.error(f"Error preprocessing image: {str(img_error)}")
            return jsonify({
                'error': 'Image preprocessing failed',
                'details': str(img_error)
            }), 400

        # Make prediction
        try:
            start_time = time.time()
            predictions = model.predict(img_array)
            prediction_time = time.time() - start_time
            logger.info(f"Prediction completed in {prediction_time:.2f} seconds")
        except Exception as pred_error:
            logger.error(f"Error during model prediction: {str(pred_error)}")
            return jsonify({
                'error': 'Model prediction failed',
                'details': str(pred_error)
            }), 500
        
        # Get the predicted class and confidence
        predicted_class = np.argmax(predictions)
        confidence = float(np.max(predictions))
        
        # Log the prediction
        logger.info(f"Predicted class: {predicted_class} ({CLASS_LABELS.get(predicted_class, 'Unknown')}) with confidence: {confidence:.4f}")

        return jsonify({
            'predicted_class': int(predicted_class),
            'confidence': confidence,
            'class_name': CLASS_LABELS.get(int(predicted_class), 'Unknown'),
            'prediction_time': prediction_time
        })
    except Exception as e:
        import traceback
        logger.error(f"Error during prediction: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({
            'error': 'Prediction failed',
            'details': str(e)
        }), 500

if __name__ == "__main__":
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    
    # Create a dummy model file for testing if no model exists
    if model is None:
        try:
            logger.warning("Creating a dummy model for testing purposes")
            dummy_model_dir = os.path.join(os.path.dirname(__file__), "trained_model")
            os.makedirs(dummy_model_dir, exist_ok=True)
            dummy_model_path = os.path.join(dummy_model_dir, "dummy_model.h5")
            
            # Create a very simple model with proper input shape for image classification
            inputs = tf.keras.layers.Input(shape=(224, 224, 3))
            x = tf.keras.layers.Conv2D(32, (3, 3), activation='relu')(inputs)
            x = tf.keras.layers.MaxPooling2D((2, 2))(x)
            x = tf.keras.layers.Conv2D(64, (3, 3), activation='relu')(x)
            x = tf.keras.layers.MaxPooling2D((2, 2))(x)
            x = tf.keras.layers.Flatten()(x)
            x = tf.keras.layers.Dense(128, activation='relu')(x)
            outputs = tf.keras.layers.Dense(7, activation='softmax')(x)
            
            simple_model = tf.keras.Model(inputs=inputs, outputs=outputs)
            simple_model.compile(
                optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # Save the model
            simple_model.save(dummy_model_path)
            
            logger.info(f"Dummy model created at: {dummy_model_path}")
            logger.info("Loading dummy model")
            model = load_model(dummy_model_path)
            logger.info("Dummy model loaded successfully")
            
            # Test the model with a random input to ensure it works
            test_input = np.random.random((1, 224, 224, 3))
            test_output = model.predict(test_input)
            logger.info(f"Dummy model test successful. Output shape: {test_output.shape}")
            
        except Exception as e:
            logger.error(f"Error creating dummy model: {str(e)}")
            logger.error("The API will start but predictions will fail")
    
    port = int(os.environ.get("PORT", 5000))
    logger.info(f"Starting Flask API server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
