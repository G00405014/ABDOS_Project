# Skin Cancer Model Integration

This guide helps you integrate the skin cancer model at `C:\Users\User\Downloads\skin_cancer_model.h5` with your existing API.

## What has been done

1. The model path has been added to `model_api.py` to prioritize loading your model.
2. Testing scripts have been created to verify model loading and API functionality.

## Testing your model

To test if your model loads correctly:

```bash
# Test if the model loads properly
python test_model_load.py
```

This will attempt to load your model using multiple methods and report whether it's compatible with your API.

## Testing the API with your model

To test the API with your model:

1. First make sure your API server is running.
2. Run the test script with an image:

```bash
python test_api_with_model.py --image path/to/your/skin_image.jpg
```

You can also check if the API is up and running:

```bash
python test_api_with_model.py --health
```

## Using the skin cancer prediction script directly

If you want to use the model directly without the API, you can use the standalone script:

```bash
python skin_cancer_predictor.py
```

This will open a file dialog where you can select an image for prediction. The script will:
1. Load your model from `C:\Users\User\Downloads\skin_cancer_model.h5`
2. Process the selected image
3. Make a prediction
4. Display the results

## Troubleshooting

If the model fails to load:

1. Check that the file exists at `C:\Users\User\Downloads\skin_cancer_model.h5`
2. Verify that the file is a valid TensorFlow model (H5 format)
3. Check the model's architecture - it should use MobileNetV2 and have 7 output classes

If the API fails:

1. Make sure the API server is running
2. Check the server logs for errors
3. Verify that the model loaded successfully when the server started

## Model information

The model classifies skin lesions into 7 categories:

| Index | Code  | Condition               | Risk Level |
|-------|-------|-------------------------|------------|
| 0     | akiec | Actinic Keratoses       | Moderate   |
| 1     | bcc   | Basal Cell Carcinoma    | High       |
| 2     | bkl   | Benign Keratosis        | Low        |
| 3     | df    | Dermatofibroma          | Low        |
| 4     | mel   | Melanoma                | Very High  |
| 5     | nv    | Melanocytic Nevi (moles)| Low        |
| 6     | vasc  | Vascular Lesions        | Low        | 