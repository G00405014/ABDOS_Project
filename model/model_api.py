from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS if frontend and backend are on different origins

# Adjust the model path to point to your model file location
model_path = r"C:\Users\User\Downloads\skin_cancer_final_model.h5"
model = load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    img = Image.open(file.stream).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)/255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    confidence = float(np.max(predictions))

    return jsonify({
        'predicted_class': int(predicted_class),
        'confidence': confidence
    })

if __name__ == "__main__":
    # Run this from the ABDOS_Project directory: `python backend/model_api.py`
    app.run(host='0.0.0.0', port=5000, debug=True)
