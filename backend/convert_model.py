import tensorflow as tf
import os
import sys
from tensorflow.keras.models import load_model
import numpy as np

# Define custom preprocessing layer (same as in the existing model_api.py)
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

# Define TrueDivide layer
class TrueDivide(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super(TrueDivide, self).__init__(**kwargs)
    
    def call(self, inputs):
        return inputs / 127.5 - 1.0
    
    def get_config(self):
        base_config = super(TrueDivide, self).get_config()
        return base_config

# Path to your H5 model
model_path = os.path.join(os.path.dirname(os.getcwd()), "model", "trained_model", "dummy_model.h5")
# Path for saving the model
export_path = os.path.join(os.getcwd(), "models", "skin_condition", "1")

# Custom objects for loading the model
custom_objects = {
    'Preprocessing': Preprocessing,
    'TrueDivide': TrueDivide
}

try:
    # Load the model with custom layer
    model = load_model(model_path, custom_objects=custom_objects)
    print("Model loaded successfully!")

    # Create a serving function with signatures
    @tf.function(input_signature=[tf.TensorSpec(shape=[None, 224, 224, 3], dtype=tf.float32, name="input_image")])
    def serving_fn(input_image):
        # The preprocessing is already part of the model architecture
        predictions = model(input_image, training=False)
        
        # Apply temperature scaling and softmax
        temperature = 1.5
        scaled_predictions = predictions / temperature
        probabilities = tf.nn.softmax(scaled_predictions)
        
        return {
            "predictions": probabilities,
            "classes": tf.argmax(probabilities, axis=1)
        }

    # Create concrete function
    concrete_serving_fn = serving_fn.get_concrete_function()
    
    # Save the model
    tf.saved_model.save(
        model,
        export_path,
        signatures={
            "serving_default": concrete_serving_fn
        }
    )
    
    print(f"Model saved to {export_path}")
    
except Exception as e:
    print(f"Error converting model: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1) 