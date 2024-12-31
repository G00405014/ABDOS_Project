from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

model_path = r"C:\Users\User\Downloads\skin_cancer_final_model.h5"
model = load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    print("Received prediction request")
    print("Request files:", request.files)
    print("Request headers:", dict(request.headers))
    
    try:
        if 'image' not in request.files:
            print("No image file in request. Available files:", list(request.files.keys()))
            return jsonify({'error': 'No image provided'}), 400

        file = request.files['image']
        print(f"Received file: {file.filename}")

        # Read image from memory
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img)/255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions)
        confidence = float(np.max(predictions))

        conditions = [
            'Actinic Keratoses',
            'Basal Cell Carcinoma',
            'Benign Keratosis',
            'Dermatofibroma',
            'Melanoma',
            'Melanocytic Nevi',
            'Vascular Lesions'
        ]

        return jsonify({
            'predicted_class': conditions[predicted_class],
            'confidence': confidence
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True) 