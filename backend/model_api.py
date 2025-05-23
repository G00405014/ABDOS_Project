from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import io
import os
import time
from datetime import datetime, timezone
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import re

app = Flask(__name__)

# Explicitly configure CORS
# Allow requests from your frontend origins (port 3000 and 3001 just in case)
CORS(app, 
     origins=["http://localhost:3000", "http://localhost:3001"], 
     supports_credentials=True
)

# Initialize JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Tokens don't expire
jwt = JWTManager(app)

# Define custom preprocessing layer
class Preprocessing(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super(Preprocessing, self).__init__(**kwargs)

    def call(self, inputs):
        # Convert inputs to float32
        x = tf.cast(inputs, tf.float32)
        # Normalize to [-1, 1] range
        x = x / 127.5
        x = x - 1.0
        return x

    def get_config(self):
        base_config = super(Preprocessing, self).get_config()
        return base_config

# Set the model path to only use the user's downloaded model
MODEL_PATH = r"C:\Users\User\Downloads\skin_cancer_model.h5"

# Load the model at startup
try:
    print(f"Loading model from: {MODEL_PATH}")
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Failed to load model from {MODEL_PATH}: {e}")
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded',
            'model_path': MODEL_PATH
        }), 503
    return jsonify({
        'status': 'healthy',
        'message': 'Backend API is running'
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model failed to load'}), 500
        
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        file = request.files['image']
        user_id_str = request.form.get('user_id')  # Get user_id string if provided
        user_object_id = None
        if user_id_str:
            try:
                user_object_id = ObjectId(user_id_str) # Convert string to ObjectId
            except Exception as oid_error:
                print(f"Warning: Invalid user_id format received: {user_id_str}. Error: {oid_error}")
                # Decide how to handle: maybe return an error, or proceed without saving history
                # For now, we'll proceed without saving for this prediction.
                user_object_id = None 
        
        # Process the image
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        
        # Convert to numpy array and preprocess
        img_array = np.array(img).astype(np.float32)
        img_array = img_array / 127.5 - 1.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make predictions
        predictions = model.predict(img_array, verbose=0)
        
        # Define conditions first so we can use them in our print statements
        conditions = [
            'Actinic Keratoses',
            'Basal Cell Carcinoma',
            'Benign Keratosis',
            'Dermatofibroma',
            'Melanoma',
            'Melanocytic Nevi',
            'Vascular Lesions'
        ]
        
        # Get raw probabilities from model and ensure they sum to 1
        probabilities = predictions[0]
        probabilities = probabilities / np.sum(probabilities)  # Normalize to ensure sum is 1
        
        print(f"Model probabilities: {[round(p*100, 2) for p in probabilities]}")
        print(f"Prediction: {np.argmax(probabilities)} - {conditions[np.argmax(probabilities)]}")
        
        # Get predicted class and confidence
        predicted_class = np.argmax(probabilities)
        confidence_pct = float(probabilities[predicted_class] * 100)
        
        # Process probabilities for all conditions
        all_probabilities = {}
        for i, condition in enumerate(conditions):
            prob = float(probabilities[i] * 100)
            if prob < 1.0:
                prob = 0.0
            all_probabilities[condition] = round(prob, 2)
        
        # Get top 3 predictions
        top_indices = np.argsort(probabilities)[-3:][::-1]
        top_predictions = [
            (conditions[idx], probabilities[idx] * 100) for idx in top_indices
        ]
        top_pred_info = [f"{name} ({conf:.2f}%)" for name, conf in top_predictions]
        print(f"Top 3 predictions: {', '.join(top_pred_info)}")
        
        # Prepare response
        response = {
            'predicted_class': int(predicted_class),
            'class_name': conditions[predicted_class],
            'confidence': confidence_pct,
            'probabilities': all_probabilities,
            'top_predictions': top_predictions,
            'timestamp': datetime.now(timezone.utc),
        }
        
        # Store the prediction in MongoDB
        prediction_data = {
            # Store the ObjectId if conversion was successful
            'user_id': user_object_id, 
            'timestamp': datetime.now(timezone.utc),
            'predicted_class': int(predicted_class),
            'confidence': confidence_pct,
            'label': conditions[predicted_class],
            'all_probabilities': all_probabilities,
            'image_name': file.filename
        }
        
        # Only store if we have a valid user ObjectId
        if user_object_id:  
            try:
                print(f"Attempting to save prediction for user ObjectId: {user_object_id}")
                mongo.db.predictions.insert_one(prediction_data)
                print("Prediction saved successfully.")
            except Exception as db_error:
                 print(f"!!! Database error saving prediction: {db_error}")
                 # Decide if this error should be returned to user or just logged
        else:
            print("No valid user_id provided, prediction result not saved to history.")
            
        # Return prediction results regardless of saving success
        return jsonify(response)
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/history/<user_id>', methods=['GET'])
@jwt_required()
def get_history(user_id):
    current_user_email = get_jwt_identity()
    user = mongo.db.users.find_one({'email': current_user_email})
    
    # Verify the user ID from the token matches the requested user ID
    # Convert ObjectId to string for comparison
    if not user or str(user['_id']) != user_id:
        return jsonify({'message': 'Unauthorized to view this history'}), 403
        
    try:
        # Get user's prediction history
        predictions = list(mongo.db.predictions.find(
            # Query by the validated user_id (which is an ObjectId in the predictions collection)
            {'user_id': user['_id']},
            {'_id': 0}  # Exclude MongoDB _id from results
        ).sort('timestamp', -1))  # Sort by timestamp descending
        
        # Convert ObjectId in user_id field to string for JSON response if needed
        for p in predictions:
            if 'user_id' in p and isinstance(p['user_id'], ObjectId):
                 p['user_id'] = str(p['user_id'])
            if 'timestamp' in p and isinstance(p['timestamp'], datetime):
                 p['timestamp'] = p['timestamp'].isoformat()
                 
        return jsonify(predictions)
    except Exception as e:
        print(f"Error fetching history: {e}")
        return jsonify({'error': str(e)}), 500

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"Received data for registration: {data}")
        
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
            
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Basic Input Validation
        if not all([name, email, password]):
             print(f"Validation failed: name='{name}', email='{email}', password exists: {'True' if password else 'False'}")
             return jsonify({'message': 'Missing required fields (name, email, password)'}), 400
        
        # More specific validation (e.g., email format) can be added here
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
             return jsonify({'message': 'Invalid email format'}), 400
             
        # Check if user already exists
        print(f"Checking if user exists: {email}") # Log check
        existing_user = mongo.db.users.find_one({'email': email})
        if existing_user:
            print(f"User {email} already exists.") # Log result
            return jsonify({'message': 'User already exists'}), 400
        print(f"User {email} does not exist. Proceeding with registration.") # Log result

        # Create new user document
        hashed_password = generate_password_hash(password)
        user_doc = {
            'name': name,
            'email': email,
            'password': hashed_password, # Store the hash
            'created_at': datetime.now(timezone.utc)
        }
        
        print(f"Attempting to insert user document for {email}") # Log before insert
        try:
            result = mongo.db.users.insert_one(user_doc)
            user_id = str(result.inserted_id)
            print(f"Successfully inserted user {email} with ID: {user_id}") # Log success
        except Exception as db_error:
            print(f"!!! Database insertion error for {email}: {db_error}") # Log specific DB error
            raise db_error # Re-raise the exception to be caught by the outer block

        # Create access token
        access_token = create_access_token(identity=email)
        print(f"JWT token created for {email}") # Log token creation
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'id': user_id,
                'name': name,
                'email': email
            }
        }), 201

    except Exception as e:
        print(f"!!! Overall error during registration for {email}: {e}") # Log the actual error
        import traceback
        traceback.print_exc()
        return jsonify({'message': 'An internal server error occurred during registration'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
            
        email = data.get('email')
        password = data.get('password')

        # Basic Input Validation
        if not all([email, password]):
            return jsonify({'message': 'Missing required fields (email, password)'}), 400
            
        user = mongo.db.users.find_one({'email': email})
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'message': 'Invalid credentials'}), 401

        access_token = create_access_token(identity=email)
        user_id = str(user['_id']) # Get user ID as string
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user_id, # Add user ID
                'name': user['name'],
                'email': user['email']
            }
        })

    except Exception as e:
        print(f"Error during login: {e}") # Log the actual error
        import traceback
        traceback.print_exc()
        return jsonify({'message': 'An internal server error occurred'}), 500 # Generic message

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        current_user_email = get_jwt_identity()
        user = mongo.db.users.find_one({'email': current_user_email}, {'password': 0})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404

        user_id = str(user['_id']) # Get user ID as string
        return jsonify({
            'id': user_id, # Add user ID
            'name': user['name'],
            'email': user['email']
        })

    except Exception as e:
        print(f"Error fetching profile: {e}")
        return jsonify({'message': str(e)}), 500

# Add profile PUT route for updates
@app.route('/api/auth/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_email = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No update data provided'}), 400
            
        # Fields allowed to be updated
        update_fields = {}
        if 'name' in data and isinstance(data['name'], str) and data['name'].strip():
            update_fields['name'] = data['name'].strip()
        
        # Add other updatable fields here (e.g., password - requires hashing)
        # if 'password' in data: ...
        
        if not update_fields:
            return jsonify({'message': 'No valid fields provided for update'}), 400
            
        # Add updated_at timestamp
        update_fields['updated_at'] = datetime.now(timezone.utc)
        
        print(f"Attempting to update profile for {current_user_email} with: {update_fields}")
        result = mongo.db.users.update_one(
            {'email': current_user_email},
            {'$set': update_fields}
        )
        
        if result.matched_count == 0:
             print(f"User not found during update attempt for {current_user_email}")
             return jsonify({'message': 'User not found'}), 404
             
        if result.modified_count == 0 and result.matched_count == 1:
             print(f"Profile data was the same for {current_user_email}, no update performed.")
             # Return success even if no change, or a specific message
             # return jsonify({'message': 'No changes detected'}), 200 
             pass # Continue to fetch and return updated profile
        else:     
            print(f"Profile updated successfully for {current_user_email}")
        
        # Fetch and return the updated profile data
        updated_user = mongo.db.users.find_one({'email': current_user_email}, {'password': 0})
        if not updated_user:
             # Should not happen if update matched, but handle defensively
             return jsonify({'message': 'Failed to retrieve updated profile'}), 500
             
        updated_user_id = str(updated_user['_id'])
        return jsonify({
            'message': 'Profile updated successfully',
            'user': {
                 'id': updated_user_id,
                 'name': updated_user['name'],
                 'email': updated_user['email']
                 # Include other fields returned by profile GET route
            }
        })

    except Exception as e:
        print(f"Error updating profile for {current_user_email}: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'message': 'An internal server error occurred during profile update'}), 500

# ... (logout endpoint, main block) ...

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)