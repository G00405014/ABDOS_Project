import tensorflow as tf
import os
import numpy as np

# Define a simple model for image classification
def create_dummy_model():
    # Create a simple CNN model
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(224, 224, 3)),
        tf.keras.layers.Conv2D(16, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(7, activation='softmax')
    ])
    
    # Compile the model
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    
    return model

# Class labels
CLASS_LABELS = {
    0: 'Actinic Keratoses',
    1: 'Basal Cell Carcinoma',
    2: 'Benign Keratosis',
    3: 'Dermatofibroma',
    4: 'Melanoma',
    5: 'Melanocytic Nevi',
    6: 'Vascular Lesions'
}

# Path for saving the model
export_path = os.path.join(os.getcwd(), "models", "skin_condition", "1", "saved_model")

# Create the directory structure if it doesn't exist
os.makedirs(export_path, exist_ok=True)

# Create and save the model
try:
    # Create a model instance
    model = create_dummy_model()
    print("Created dummy model")
    
    # Define a prediction function with appropriate signature for TF Serving
    @tf.function(input_signature=[tf.TensorSpec(shape=[None, 224, 224, 3], dtype=tf.float32, name="input_image")])
    def serving_fn(input_image):
        predictions = model(input_image, training=False)
        return {
            "predictions": predictions,
            "classes": tf.argmax(predictions, axis=1)
        }
    
    # Create a SavedModel signature
    signatures = {
        "serving_default": serving_fn
    }
    
    # Save the model in SavedModel format
    tf.saved_model.save(model, export_path, signatures=signatures)
    
    print(f"Dummy model saved to {export_path}")
    
    # Also save class labels as a JSON file for reference
    import json
    labels_path = os.path.join(os.path.dirname(export_path), "labels.json")
    with open(labels_path, "w") as f:
        json.dump(CLASS_LABELS, f)
    
    print(f"Class labels saved to {labels_path}")
    
except Exception as e:
    print(f"Error creating and saving dummy model: {e}")
    import traceback
    traceback.print_exc()

if __name__ == "__main__":
    # Create model
    model = create_dummy_model()
    
    # Create directory if it doesn't exist
    model_dir = os.path.join(os.getcwd(), "models", "skin_condition", "1")
    os.makedirs(model_dir, exist_ok=True)
    
    # Save model in .keras format
    model_path = os.path.join(model_dir, "model.keras")
    model.save(model_path)
    print(f"Dummy model saved to {model_path}") 