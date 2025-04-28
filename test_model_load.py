# ============================================================
# Skin Cancer Model Loading Test
# ============================================================
# This script verifies that your skin cancer detection model
# can be loaded correctly and is ready for use with the API.
# It tries multiple loading methods in case one fails.

import tensorflow as tf
import os
import numpy as np
from tensorflow.keras.models import load_model

# ============================================================
# Custom Model Layers
# ============================================================
# These layers are needed to properly load models that were
# trained with custom preprocessing or normalization

class Preprocessing(tf.keras.layers.Layer):
    """
    Custom layer that preprocesses input images by:
    1. Converting to float32
    2. Normalizing to [-1, 1] range
    """
    def __init__(self, **kwargs):
        super(Preprocessing, self).__init__(**kwargs)

    def call(self, inputs):
        # Convert inputs to float32 for better precision
        x = tf.cast(inputs, tf.float32)
        # Scale values to [-1, 1] range for better model performance
        x = x / 127.5
        x = x - 1.0
        return x

    def get_config(self):
        base_config = super(Preprocessing, self).get_config()
        return base_config

class TrueDivide(tf.keras.layers.Layer):
    """
    Custom layer that normalizes input values by division
    and offset. Similar to Preprocessing but with configurable
    parameters.
    """
    def __init__(self, divisor=127.5, offset=1.0, **kwargs):
        super(TrueDivide, self).__init__(**kwargs)
        self.divisor = divisor
        self.offset = offset
    
    def call(self, inputs):
        return tf.divide(inputs, self.divisor) - self.offset
    
    def get_config(self):
        config = super(TrueDivide, self).get_config()
        config.update({
            'divisor': self.divisor,
            'offset': self.offset
        })
        return config

# Dictionary of custom layers needed for model loading
custom_objects = {
    'Preprocessing': Preprocessing,
    'TrueDivide': TrueDivide
}

# Path to the skin cancer detection model
model_path = r"C:\Users\User\Downloads\skin_cancer_model.h5"

def test_model_load(path):
    """
    Test if the model can be loaded and used for predictions
    
    This function tries three different methods to load the model:
    1. Loading with custom preprocessing layers
    2. Loading without custom layers
    3. Creating a new model and loading just the weights
    
    Args:
        path: Path to the model file
        
    Returns:
        bool: True if model loads successfully, False otherwise
    """
    print(f"Testing if model can be loaded from: {path}")
    
    # First, check if the model file exists
    if not os.path.exists(path):
        print(f"ERROR: File not found at {path}")
        return False
    
    print(f"File exists. Size: {os.path.getsize(path) / (1024*1024):.2f} MB")
    
    # Try multiple methods to load the model
    try:
        print("\nMethod 1: Loading with custom objects...")
        # Try loading with our custom preprocessing layers
        model = load_model(path, custom_objects=custom_objects, compile=False)
        print("SUCCESS: Model loaded with custom objects")
        
        # Verify the model works by testing with random input
        print("Testing model with random input...")
        test_input = np.random.random((1, 224, 224, 3))
        predictions = model.predict(test_input)
        print(f"Model successfully predicted. Output shape: {predictions.shape}")
        return True
    
    except Exception as e:
        print(f"Failed with custom objects: {str(e)}")
        
        try:
            print("\nMethod 2: Loading without custom objects...")
            # Try loading without any custom layers
            model = load_model(path, compile=False)
            print("SUCCESS: Model loaded without custom objects")
            
            # Verify the model works
            print("Testing model with random input...")
            test_input = np.random.random((1, 224, 224, 3))
            predictions = model.predict(test_input)
            print(f"Model successfully predicted. Output shape: {predictions.shape}")
            return True
            
        except Exception as e:
            print(f"Failed without custom objects: {str(e)}")
            
            try:
                print("\nMethod 3: Creating model and loading weights...")
                # If direct loading fails, try rebuilding the model architecture
                # and loading just the weights
                
                # Start with MobileNetV2 as the base model
                base_model = tf.keras.applications.MobileNetV2(
                    include_top=False, 
                    weights='imagenet', 
                    input_shape=(224, 224, 3)
                )
                base_model.trainable = False
                
                # Recreate the model architecture:
                # 1. Input layer for images
                inputs = tf.keras.layers.Input(shape=(224, 224, 3))
                # 2. Preprocess the inputs
                x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)
                # 3. Pass through the base model
                x = base_model(x, training=False)
                # 4. Add classification layers
                x = tf.keras.layers.GlobalAveragePooling2D()(x)
                x = tf.keras.layers.BatchNormalization()(x)
                x = tf.keras.layers.Dropout(0.5)(x)
                # 5. Add dense layers with dropout for better generalization
                x = tf.keras.layers.Dense(512, activation='relu')(x)
                x = tf.keras.layers.BatchNormalization()(x)
                x = tf.keras.layers.Dropout(0.3)(x)
                x = tf.keras.layers.Dense(256, activation='relu')(x)
                x = tf.keras.layers.BatchNormalization()(x)
                x = tf.keras.layers.Dropout(0.3)(x)
                # 6. Output layer with 7 classes (skin conditions)
                outputs = tf.keras.layers.Dense(7, activation='softmax')(x)
                
                # Create the model from our architecture
                model = tf.keras.Model(inputs, outputs)
                
                # Try to load just the weights
                model.load_weights(path)
                print("SUCCESS: Loaded weights into newly created model")
                
                # Verify the model works
                print("Testing model with random input...")
                test_input = np.random.random((1, 224, 224, 3))
                predictions = model.predict(test_input)
                print(f"Model successfully predicted. Output shape: {predictions.shape}")
                return True
                
            except Exception as e:
                print(f"Failed loading weights: {str(e)}")
                print("\nAll methods failed. The model file might be incompatible or corrupted.")
                return False

if __name__ == "__main__":
    """
    Main function that runs the model loading test
    
    This will:
    1. Try to load your model using multiple methods
    2. Test if the loaded model can make predictions
    3. Report whether the model is ready for use with the API
    """
    print("="*50)
    print("MODEL LOADING TEST")
    print("="*50)
    
    success = test_model_load(model_path)
    
    print("\n" + "="*50)
    if success:
        print("SUCCESS: The model was loaded successfully!")
        print("Your model is compatible with the API and should work correctly.")
    else:
        print("FAILED: Could not load the model.")
        print("Please check the model file format and compatibility.")
    print("="*50) 