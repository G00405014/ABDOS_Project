# ============================================================
# Skin Cancer Detection API
# ============================================================
# This is the main API server that handles skin cancer detection requests.
# It loads a pre-trained deep learning model and provides endpoints for:
# - Image prediction
# - User authentication
# - History tracking
# - Health monitoring

# Import necessary libraries
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
import logging
import time
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import MongoClient
import sys
from waitress import serve

# Set up logging to track server activity and debug issues
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Connect to MongoDB database for storing user data and prediction history
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['abdos_db']
    mongo = db
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise

# ============================================================
# Model Loading
# ============================================================
# Only load the user's downloaded model
MODEL_PATH = r"C:\Users\User\Downloads\skin_cancer_model.h5"
model = None
try:
    logger.info(f"Loading model from: {MODEL_PATH}")
    model = load_model(MODEL_PATH, compile=False)
    logger.info("Model loaded successfully!")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

# ============================================================
# API Endpoints
# ============================================================

@app.route('/', methods=['GET'])
def index():
    """Serve the API documentation page"""
    return render_template('index.html', model_loaded=model is not None)

@app.route('/health', methods=['GET'])
def health_check():
    """Check if the API and model are working properly"""
    status = {
        'status': 'healthy',
        'model_loaded': model is not None
    }
    return jsonify(status)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Process an uploaded skin lesion image and return predictions
    
    Expects a multipart/form-data request with an 'image' file
    Returns prediction results including:
    - predicted_class: The numeric class ID (0-6)
    - confidence: Confidence score (0-1)
    - class_name: Human-readable name of the predicted condition
    - prediction_time: Time taken to process the image
    """
    logger.info("--- PREDICT ENDPOINT ENTERED (Expecting Multipart) ---")
    sys.stdout.flush()

    if model is None:
        logger.error("Prediction attempted but model is not loaded")
        sys.stdout.flush()
        return jsonify({
            'error': 'Model not loaded',
            'details': 'The model failed to load or the model file was not found'
        }), 503

    if 'image' not in request.files:
        logger.error("No 'image' key found in request.files")
        sys.stdout.flush()
        return jsonify({'error': "No 'image' key found in request.files"}), 400
        
    try:
        file = request.files['image']
        logger.info(f"Processing image: {file.filename}, Content type: {file.content_type}, Size: {file.content_length} bytes")
        sys.stdout.flush()

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            logger.error(f"Unsupported file format: {file.filename}")
            sys.stdout.flush()
            return jsonify({
                'error': 'Unsupported file format',
                'details': 'Only JPG, JPEG, and PNG images are supported'
            }), 400

        try:
            img = Image.open(file.stream)
            logger.info(f"Image opened successfully from stream. Size: {img.size}, Mode: {img.mode}")
            sys.stdout.flush()

            if img.mode != 'RGB':
                logger.info(f"Converting image from {img.mode} to RGB")
                sys.stdout.flush()
                img = img.convert('RGB')

            img = img.resize((224, 224), Image.LANCZOS)
            logger.info(f"Image resized to: {img.size}")
            sys.stdout.flush()

            img_array = np.array(img, dtype=np.float32) / 255.0
            logger.info(f"Image converted to array. Shape: {img_array.shape}, Range: [{img_array.min()}, {img_array.max()}]")
            sys.stdout.flush()

            img_array = np.expand_dims(img_array, axis=0)
            logger.info(f"Final array shape: {img_array.shape}")
            sys.stdout.flush()

        except Exception as img_error:
            logger.error(f"Error preprocessing image from stream: {str(img_error)}")
            sys.stdout.flush()
            return jsonify({'error': 'Image preprocessing failed', 'details': str(img_error)}), 400
        
        try:
            start_time = time.time()
            predictions = model.predict(img_array)
            prediction_time = time.time() - start_time
            logger.info(f"Prediction completed in {prediction_time:.2f} seconds")
            sys.stdout.flush()
        except Exception as pred_error:
            logger.error(f"Error during model prediction: {str(pred_error)}")
            sys.stdout.flush()
            return jsonify({'error': 'Model prediction failed', 'details': str(pred_error)}), 500
        
        predicted_class = np.argmax(predictions)
        confidence = float(np.max(predictions))
        logger.info(f"Predicted class: {predicted_class} ({CLASS_LABELS.get(predicted_class, 'Unknown')}) with confidence: {confidence:.4f}")
        sys.stdout.flush()
        
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
        sys.stdout.flush()
        return jsonify({
            'error': 'Prediction failed',
            'details': str(e)
        }), 500

# ============================================================
# Authentication Routes
# ============================================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """
    Register a new user
    
    Expects JSON with:
    - username: User's desired username
    - email: User's email address
    - password: User's password (will be hashed)
    
    Returns:
    - success message and JWT token on success
    - error message if registration fails
    """
    try:
        data = request.get_json()
        
        # Make sure all required fields are present
        if not all(k in data for k in ['username', 'email', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if username already exists
        if mongo.users.find_one({'username': data['username']}):
            return jsonify({'error': 'Username already exists'}), 400
        
        # Check if email already exists
        if mongo.users.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already exists'}), 400
        
        # Create new user document
        user = {
            'username': data['username'],
            'email': data['email'],
            'password': generate_password_hash(data['password']),  # Hash the password
            'created_at': datetime.utcnow(),
            'predictions': []  # List to store prediction history
        }
        
        # Insert the new user into the database
        result = mongo.users.insert_one(user)
        
        # Generate access token
        access_token = create_access_token(identity=str(result.inserted_id))
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token
        }), 201
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """
    Log in an existing user
    
    Expects JSON with:
    - username: User's username
    - password: User's password
    
    Returns:
    - access token and success message on successful login
    - error message if login fails
    """
    try:
        data = request.get_json()
        
        # Make sure username and password were provided
        if not all(k in data for k in ['username', 'password']):
            return jsonify({'error': 'Missing username or password'}), 400
        
        # Find the user in the database
        user = mongo.users.find_one({'username': data['username']})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Check if password is correct
        if not check_password_hash(user['password'], data['password']):
            return jsonify({'error': 'Invalid password'}), 401
        
        # Generate access token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token
        }), 200
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def profile():
    """
    Get the current user's profile information
    
    Requires: Valid JWT token in Authorization header
    
    Returns:
    - user profile information (excluding password)
    - error message if profile cannot be retrieved
    """
    try:
        # Get user ID from JWT token
        current_user_id = get_jwt_identity()
        
        # Find user in database
        user = mongo.users.find_one({'_id': ObjectId(current_user_id)})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Remove sensitive information
        user.pop('password', None)
        user['_id'] = str(user['_id'])
        
        return jsonify(user), 200
        
    except Exception as e:
        logger.error(f"Profile retrieval error: {str(e)}")
        return jsonify({'error': 'Could not retrieve profile', 'details': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Log out the current user
    
    Requires: Valid JWT token in Authorization header
    
    Note: Since JWTs are stateless, this endpoint mainly exists for client-side cleanup
    The client should delete the token from their storage
    """
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/history/<user_id>', methods=['GET'])
@jwt_required()
def get_history(user_id):
    """
    Get a user's prediction history
    
    Requires:
    - Valid JWT token in Authorization header
    - user_id: ID of the user whose history to retrieve
    
    Returns:
    - list of previous predictions
    - error message if history cannot be retrieved
    """
    try:
        # Verify the requesting user has permission to view this history
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({'error': 'Unauthorized to view this history'}), 403
        
        # Find user in database
        user = mongo.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Return prediction history
        predictions = user.get('predictions', [])
        return jsonify({
            'predictions': predictions,
            'total_predictions': len(predictions)
        }), 200
        
    except Exception as e:
        logger.error(f"History retrieval error: {str(e)}")
        return jsonify({'error': 'Could not retrieve history', 'details': str(e)}), 500

def generate_disease_report(disease, confidence):
    reports = {
        'actinic keratoses': {
            'diagnosis': 'Actinic Keratoses',
            'description': 'Precancerous skin lesions caused by sun damage detected.',
            'recommendations': [
                'Consult with a dermatologist',
                'Consider cryotherapy or topical treatments',
                'Regular skin monitoring required',
                'Sun protection measures essential'
            ]
        },
        'basal cell carcinoma': {
            'diagnosis': 'Basal Cell Carcinoma',
            'description': 'Most common type of skin cancer detected.',
            'recommendations': [
                'Immediate dermatologist consultation required',
                'Biopsy confirmation needed',
                'Surgical removal likely necessary',
                'Regular follow-up appointments essential'
            ]
        },
        'benign keratosis': {
            'diagnosis': 'Benign Keratosis',
            'description': 'Non-cancerous skin growth detected.',
            'recommendations': [
                'Regular monitoring recommended',
                'Consider removal if causing discomfort',
                'No immediate treatment required',
                'Maintain regular skin checks'
            ]
        },
        'dermatofibroma': {
            'diagnosis': 'Dermatofibroma',
            'description': 'Common benign skin growth detected.',
            'recommendations': [
                'No treatment necessary unless symptomatic',
                'Monitor for any changes',
                'Consider removal if causing discomfort',
                'Regular skin checks recommended'
            ]
        },
        'melanoma': {
            'diagnosis': 'Melanoma',
            'description': 'Serious type of skin cancer detected.',
            'recommendations': [
                'Urgent dermatologist consultation required',
                'Immediate biopsy confirmation needed',
                'Surgical intervention likely necessary',
                'Regular monitoring and follow-up essential'
            ]
        },
        'melanocytic nevi': {
            'diagnosis': 'Melanocytic Nevi',
            'description': 'Common mole detected.',
            'recommendations': [
                'Regular monitoring recommended',
                'Consider removal if changing in appearance',
                'No immediate treatment required',
                'Maintain regular skin checks'
            ]
        },
        'vascular lesions': {
            'diagnosis': 'Vascular Lesions',
            'description': 'Blood vessel-related skin marks detected.',
            'recommendations': [
                'Consult with dermatologist',
                'Consider laser treatment if desired',
                'Monitor for any changes',
                'No immediate treatment required'
            ]
        }
    }
    
    # Convert disease name to lowercase and remove any extra spaces
    disease_key = disease.lower().strip()
    
    # Get the report for the detected disease, default to normal if not found
    report = reports.get(disease_key, {
        'diagnosis': 'Unknown Condition',
        'description': 'The detected condition requires further evaluation.',
        'recommendations': [
            'Consult with a dermatologist',
            'Further diagnostic tests may be needed',
            'Regular monitoring recommended'
        ]
    })
    
    # Add confidence score to the report
    report['confidence'] = f"{confidence:.2%}"
    
    return report

@app.route('/api/generate-report', methods=['POST'])
@jwt_required()  # Add authentication requirement
def generate_report():
    try:
        data = request.get_json()
        disease = data.get('disease')
        confidence = float(data.get('confidence', 0))
        
        if not disease:
            return jsonify({'error': 'Disease not specified'}), 400
            
        report = generate_disease_report(disease, confidence)
        return jsonify(report)
        
    except Exception as e:
        logger.error(f"Report generation error: {str(e)}")
        return jsonify({'error': 'Failed to generate report', 'details': str(e)}), 500

# ============================================================
# Server Startup
# ============================================================

if __name__ == '__main__':
    """
    Start the API server
    
    In development:
    - Runs Flask's development server
    - Enables debug mode for auto-reloading
    
    In production:
    - Uses waitress WSGI server
    - Runs on all available network interfaces
    """
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    
    # Check if we're in development mode
    if os.environ.get('FLASK_ENV') == 'development':
        # Use Flask's development server
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        # Use production WSGI server (waitress)
        print(f"=== STARTING PRODUCTION SERVER ON PORT {port} ===")
        serve(app, host='0.0.0.0', port=port)
