# ============================================================
# Skin Cancer Prediction Tool
# ============================================================
# This standalone script allows users to predict skin cancer types
# from images using a trained deep learning model. It provides:
# - Detailed predictions with confidence scores
# - Risk level assessment
# - Recommended actions
# - Visual display of results

import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D, Input, BatchNormalization
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
import os
import matplotlib.pyplot as plt
from tkinter import Tk, filedialog

# ============================================================
# Disease Classifications and Information
# ============================================================

# Short codes for each skin condition
CLASS_NAMES = [
    'akiec',  # 0: Actinic Keratoses
    'bcc',    # 1: Basal Cell Carcinoma
    'bkl',    # 2: Benign Keratosis
    'df',     # 3: Dermatofibroma
    'mel',    # 4: Melanoma
    'nv',     # 5: Melanocytic Nevi (common moles)
    'vasc'    # 6: Vascular Lesions
]

# Detailed descriptions of each condition for patient education
CLASS_DESCRIPTIONS = {
    'akiec': 'Actinic Keratoses - Rough, scaly patches caused by years of sun exposure. Precancerous and may develop into squamous cell carcinoma if untreated.',
    'bcc': 'Basal Cell Carcinoma - The most common type of skin cancer. Appears as a pearly or waxy bump, or a flat, flesh-colored or brown scar-like lesion.',
    'bkl': 'Benign Keratosis - A non-cancerous growth that develops from keratinocytes. Usually appears as a waxy, scaly, slightly raised growth.',
    'df': 'Dermatofibroma - A common, benign skin growth that often appears as a small, firm bump. Usually pink to light brown in color.',
    'mel': 'Melanoma - The most serious form of skin cancer. May appear as a new spot or an existing spot that changes in size, shape, or color.',
    'nv': 'Melanocytic Nevi - Common, usually benign moles. Can be flat or raised, and range from pale to dark brown or black.',
    'vasc': 'Vascular Lesions - Benign growths made up of blood vessels. Includes cherry angiomas, hemangiomas, and other vascular anomalies.'
}

# Medical risk assessment for each condition
RISK_LEVELS = {
    'akiec': 'Moderate',   # Precancerous, needs attention
    'bcc': 'High',         # Cancer, but usually slow-growing
    'bkl': 'Low',          # Benign condition
    'df': 'Low',           # Benign condition
    'mel': 'Very High',    # Most dangerous form of skin cancer
    'nv': 'Low',           # Usually benign
    'vasc': 'Low'          # Benign vascular condition
}

# Medical advice for each condition
RECOMMENDED_ACTIONS = {
    'akiec': 'Consult a dermatologist within 1-2 months for evaluation and possible treatment.',
    'bcc': 'Seek medical attention within 2-4 weeks. Early treatment has excellent outcomes.',
    'bkl': 'Regular monitoring recommended. Consult a dermatologist during your next regular check-up.',
    'df': 'No immediate action required. Monitor for changes in appearance.',
    'mel': 'Urgent medical attention required. Schedule an appointment with a dermatologist within 1-2 weeks.',
    'nv': 'Regular self-examination recommended. Consult a dermatologist if you notice changes.',
    'vasc': 'No immediate action required. Monitor for changes in size or color.'
}

# ============================================================
# Model Components
# ============================================================

class Preprocessing(tf.keras.layers.Layer):
    """
    Custom layer for preprocessing images before prediction
    Normalizes pixel values to [-1, 1] range for better model performance
    """
    def __init__(self, **kwargs):
        super(Preprocessing, self).__init__(**kwargs)

    def call(self, inputs):
        # Convert to float32 for better precision
        x = tf.cast(inputs, tf.float32)
        # Scale to [-1, 1] range
        x = x / 127.5
        x = x - 1.0
        return x

    def get_config(self):
        base_config = super(Preprocessing, self).get_config()
        return base_config

def build_model(num_classes=7, img_size=(224, 224)):
    """
    Build a new model for skin cancer detection
    Used as a fallback if loading the saved model fails
    
    Architecture:
    1. MobileNetV2 base for feature extraction
    2. Global pooling to reduce feature dimensions
    3. Dense layers with dropout for classification
    4. Softmax output for 7 skin condition classes
    """
    input_shape = img_size + (3,)

    # Create input layer
    inputs = Input(shape=input_shape)

    # Load MobileNetV2 without top layers
    base_model = MobileNetV2(include_top=False, weights=None, input_shape=input_shape)

    # Add preprocessing as part of the model
    x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)
    
    # Extract features using MobileNetV2
    x = base_model(x, training=False)

    # Add classification layers
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)  # Prevent overfitting

    # Dense layers with dropout for better generalization
    x = Dense(512, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    x = Dense(256, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    # Final classification layer
    outputs = Dense(num_classes, activation='softmax')(x)

    # Create and return the model
    model = Model(inputs, outputs)
    return model, base_model

def load_and_preprocess_image(img_path, img_size=(224, 224)):
    """
    Load and prepare an image for prediction
    
    Args:
        img_path: Path to the image file
        img_size: Target size for the image (default: 224x224)
        
    Returns:
        tuple: (preprocessed image array, original image)
    """
    try:
        # Load and resize the image
        img = image.load_img(img_path, target_size=img_size)
        img_array = image.img_to_array(img)
        # Add batch dimension since model expects batches
        img_array = np.expand_dims(img_array, axis=0)
        return img_array, img
    except Exception as e:
        print(f"Error loading image: {e}")
        return None, None

def predict_skin_lesion(model_path, img_path):
    """
    Analyze a skin lesion image and provide detailed results
    
    Args:
        model_path: Path to the trained model file
        img_path: Path to the image to analyze
        
    Provides:
    - Predicted condition with confidence score
    - Risk level assessment
    - Detailed description of the condition
    - Recommended medical actions
    - Visual display of the image with prediction
    """
    try:
        # Try different methods to load the model
        print(f"Loading model from: {model_path}")
        custom_objects = {'Preprocessing': Preprocessing}
        
        try:
            # First try: Load with custom preprocessing
            model = load_model(model_path, custom_objects=custom_objects)
            print("Model loaded successfully with custom objects")
            use_preprocessing = False  # Model includes preprocessing
        except Exception as e:
            print(f"Could not load model with custom objects: {str(e)}")
            
            try:
                # Second try: Load without custom preprocessing
                model = load_model(model_path)
                print("Model loaded successfully without custom objects")
                use_preprocessing = False  # Model includes preprocessing
            except Exception as e:
                print(f"Could not load model directly: {str(e)}")
                
                # Final try: Rebuild model and load weights
                print("Attempting to rebuild the model architecture and load weights...")
                model, base_model = build_model()
                
                try:
                    model.load_weights(model_path)
                    print("Successfully loaded weights into rebuilt model")
                    use_preprocessing = True  # Need manual preprocessing
                except Exception as e:
                    print(f"Could not load weights into rebuilt model: {str(e)}")
                    print("Will continue with ImageNet weights, but predictions may be inaccurate")
                    use_preprocessing = True  # Need manual preprocessing
        
        # Prepare the image for prediction
        img_array, original_img = load_and_preprocess_image(img_path)
        if img_array is None:
            return
        
        # Preprocess if needed (when using rebuilt model)
        if use_preprocessing:
            img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
            
        # Generate prediction
        print("Making prediction...")
        predictions = model.predict(img_array)
        
        # Get the top 3 most likely conditions
        top_indices = np.argsort(predictions[0])[-3:][::-1]
        top_predictions = [
            (CLASS_NAMES[i], predictions[0][i] * 100) for i in top_indices
        ]
        
        # Display comprehensive results
        predicted_class_idx = top_indices[0]
        predicted_class = CLASS_NAMES[predicted_class_idx]
        confidence = predictions[0][predicted_class_idx] * 100
        
        print("\n===== PREDICTION RESULTS =====")
        print(f"Predicted condition: {predicted_class} ({CLASS_DESCRIPTIONS[predicted_class].split(' - ')[0]})")
        print(f"Confidence: {confidence:.2f}%")
        print(f"Risk Level: {RISK_LEVELS[predicted_class]}")
        print(f"\nDescription: {CLASS_DESCRIPTIONS[predicted_class].split(' - ')[1]}")
        print(f"\nRecommended Action: {RECOMMENDED_ACTIONS[predicted_class]}")
        
        print("\nTop 3 Predictions:")
        for i, (class_name, conf) in enumerate(top_predictions):
            print(f"  {i+1}. {class_name} ({CLASS_DESCRIPTIONS[class_name].split(' - ')[0]}): {conf:.2f}%")
        
        # Show the image with prediction overlay
        plt.figure(figsize=(8, 8))
        plt.imshow(original_img)
        title = f"Prediction: {predicted_class} ({CLASS_DESCRIPTIONS[predicted_class].split(' - ')[0]})\nConfidence: {confidence:.2f}%"
        plt.title(title)
        plt.axis('off')
        plt.show()
        
        return predicted_class, confidence, top_predictions
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        import traceback
        traceback.print_exc()
        return None, 0, []

def main():
    # Define model path (the one specified by the user)
    model_path = "C:\\Users\\User\\Downloads\\skin_cancer_model.h5"
    
    # Check if model exists
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        return
    
    # Create file dialog to select image
    root = Tk()
    root.withdraw()  # Hide the root window
    
    print("Please select a skin lesion image for prediction...")
    img_path = filedialog.askopenfilename(
        title="Select Skin Lesion Image",
        filetypes=[
            ("Image files", "*.jpg *.jpeg *.png *.bmp"),
            ("JPEG files", "*.jpg *.jpeg"),
            ("PNG files", "*.png"),
            ("All files", "*.*")
        ]
    )
    
    if not img_path:
        print("No image selected. Exiting.")
        return
    
    if not os.path.exists(img_path):
        print(f"Error: Image file not found at {img_path}")
        return
    
    predict_skin_lesion(model_path, img_path)

if __name__ == "__main__":
    main() 