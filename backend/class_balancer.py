import numpy as np
import tensorflow as tf

# Class-specific thresholds to adjust predictions
# Lower values make class easier to predict
CLASS_THRESHOLDS = {
    'akiec': 0.01,  # Actinic Keratoses - rare class (64 samples)
    'bcc': 0.01,    # Basal Cell Carcinoma - underrepresented (113 samples)
    'bkl': 0.01,    # Benign Keratosis - underrepresented (214 samples)
    'df': 0.01,     # Dermatofibroma - rarest class (27 samples)
    'mel': 0.01,    # Melanoma - underrepresented (237 samples)
    'nv': 0.99,     # Melanocytic Nevi - overrepresented (1312 samples)
    'vasc': 0.01    # Vascular Lesions - rare class (36 samples)
}

# Class names ordered by index
CLASS_NAMES = [
    'akiec',  # 0
    'bcc',    # 1
    'bkl',    # 2
    'df',     # 3
    'mel',    # 4
    'nv',     # 5
    'vasc'    # 6
]

def adjust_predictions(probabilities):
    """
    Adjust prediction probabilities to counteract class imbalance
    
    Args:
        probabilities: Original prediction probabilities from model
        
    Returns:
        Adjusted probabilities with class-specific thresholds applied
    """
    adjusted_probs = np.copy(probabilities)
    
    # Apply class-specific adjustments
    for i, class_name in enumerate(CLASS_NAMES):
        # Extreme penalty for the majority class (nv)
        if class_name == 'nv':
            adjusted_probs[i] = adjusted_probs[i] * 0.1  # 90% penalty
        # Strong boost for minority classes
        else:
            # Extreme boost for rare classes
            if class_name in ['df', 'akiec', 'vasc']:
                adjusted_probs[i] = min(1.0, adjusted_probs[i] * 10.0)  # 10x boost
            # Large boost for other minority classes
            else:
                adjusted_probs[i] = min(1.0, adjusted_probs[i] * 5.0)   # 5x boost
    
    # Re-normalize to ensure sum = 1.0
    return adjusted_probs / np.sum(adjusted_probs)

def get_top_n_predictions(probabilities, n=3):
    """
    Get the top N predictions with their probabilities
    
    Args:
        probabilities: Prediction probabilities
        n: Number of top predictions to return
        
    Returns:
        List of (class_index, class_name, probability) tuples
    """
    # Get indices of top N classes
    top_indices = np.argsort(probabilities)[-n:][::-1]
    
    # Create list of (index, name, probability) tuples
    return [(i, CLASS_NAMES[i], probabilities[i]) for i in top_indices] 