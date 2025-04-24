from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import io
import os

app = Flask(__name__)
CORS(app)

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

# Load the model with custom preprocessing layer
model_path = r"C:\Users\G00405014@atu.ie\Downloads\Model.h5"
custom_objects = {'Preprocessing': Preprocessing}

try:
    # Set memory growth to avoid TF claiming all GPU memory
    physical_devices = tf.config.list_physical_devices('GPU')
    for device in physical_devices:
        tf.config.experimental.set_memory_growth(device, True)
except:
    pass

try:
    print(f"Attempting to load model from: {model_path}")
    # Try loading as a SavedModel first
    try:
        model = tf.keras.models.load_model(model_path, custom_objects=custom_objects)
        print("Model loaded successfully using tf.keras.models.load_model!")
    except Exception as e1:
        print(f"Failed to load as SavedModel: {str(e1)}")
        print("Trying to load as weights...")
        
        # Create base model architecture
        base_model = tf.keras.applications.MobileNetV2(
            input_shape=(224, 224, 3),
            include_top=False,
            weights=None
        )
        
        # Add custom layers
        x = base_model.output
        x = tf.keras.layers.GlobalAveragePooling2D()(x)
        x = tf.keras.layers.Dense(128, activation='relu')(x)
        predictions = tf.keras.layers.Dense(7, activation='softmax')(x)
        
        # Create the model
        model = tf.keras.Model(inputs=base_model.input, outputs=predictions)
        
        try:
            # Try loading weights
            model.load_weights(model_path)
            print("Model weights loaded successfully!")
        except Exception as e2:
            print(f"Failed to load weights: {str(e2)}")
            # Try loading as a complete model without custom objects
            try:
                model = tf.keras.models.load_model(model_path)
                print("Model loaded successfully without custom objects!")
            except Exception as e3:
                print(f"Failed to load model without custom objects: {str(e3)}")
                raise Exception("All model loading attempts failed")
    
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print(f"Model path: {model_path}")
    print(f"Current working directory: {os.getcwd()}")
    import traceback
    traceback.print_exc()
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded',
            'model_path': model_path
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
        
        # Process the image
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        
        # Convert to numpy array and preprocess
        img_array = np.array(img).astype(np.float32)
        
        # Normalize manually
        img_array = img_array / 127.5 - 1.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make predictions
        predictions = model.predict(img_array, verbose=0)
        
        # Apply temperature scaling to soften the predictions
        temperature = 1.5
        scaled_predictions = predictions / temperature
        
        # Convert to probabilities using softmax
        probabilities = tf.nn.softmax(scaled_predictions).numpy()[0]
        predicted_class = np.argmax(probabilities)
        
        conditions = [
            'Actinic Keratoses',
            'Basal Cell Carcinoma',
            'Benign Keratosis',
            'Dermatofibroma',
            'Melanoma',
            'Melanocytic Nevi',
            'Vascular Lesions'
        ]
        
        # Process probabilities with proper scaling and calibration
        all_probabilities = {}
        for i, condition in enumerate(conditions):
            prob = float(probabilities[i] * 100)
            # Apply minimal probability threshold
            if prob < 1.0:
                prob = 0.0
            all_probabilities[condition] = round(prob, 2)
        
        # Get confidence for predicted class
        confidence_pct = all_probabilities[conditions[predicted_class]]
        
        print(f"Predicted: {conditions[predicted_class]} with {confidence_pct:.2f}% confidence")
        print("All probabilities:", all_probabilities)
        
        return jsonify({
            'predicted_class': int(predicted_class),
            'confidence': confidence_pct,
            'label': conditions[predicted_class],
            'all_probabilities': all_probabilities
        })
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)