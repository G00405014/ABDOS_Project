import tensorflow as tf
import os

# Create a very simple model
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(224, 224, 3), name="input_image"),
    tf.keras.layers.Conv2D(8, (3, 3), activation='relu'),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(7, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy')

# Define a serving function
@tf.function(input_signature=[tf.TensorSpec(shape=[None, 224, 224, 3], dtype=tf.float32, name="input_image")])
def serving_fn(input_image):
    return {"predictions": model(input_image)}

# Create signatures
signatures = {
    "serving_default": serving_fn
}

# Save the model
export_dir = os.path.join(os.getcwd(), "models", "skin_condition", "1")
print(f"Saving model to {export_dir}")

try:
    tf.saved_model.save(model, export_dir, signatures=signatures)
    print("Model saved successfully!")
except Exception as e:
    print(f"Error saving model: {e}")
    import traceback
    traceback.print_exc() 