# Multi-Model Support Implementation

## Summary

This implementation adds support for multiple YOLO models with a dropdown selector in the frontend and model-specific statistics.

## Changes Made

### Backend (Django)

1. **config/settings.py**
   - Added `YOLO_MODELS` dictionary containing 3 models:
     - `yolov11m-3class`: YOLOv11 Medium (3 classes)
     - `yolov11n-12class`: YOLOv11 Nano (12 classes) - default
     - `yolov8n-3class`: YOLOv8 Nano (3 classes)
   - Each model configuration includes path, number of classes, and display name

2. **classifier/yolo_model.py**
   - Modified `YOLOModel` class to support multiple model instances
   - Changed singleton pattern to support multiple model keys
   - Updated `get_yolo_model()` to accept optional `model_key` parameter

3. **classifier/views.py**
   - Updated `ImageClassificationView` to accept `model` parameter in POST request
   - Added `ModelListView` API endpoint to list available models
   - Returns model key in classification response

4. **classifier/urls.py**
   - Added `/api/models/` endpoint for listing available models

### Frontend (Next.js)

1. **lib/classify.ts**
   - Updated `classifyTrash()` function to accept optional `modelKey` parameter
   - Passes model key to backend via FormData

2. **components/recycling-plant.tsx**
   - Added model selection dropdown in header
   - Fetches available models from backend on mount
   - Passes selected model to classification function
   - Updates stats link to include selected model as query parameter

3. **app/stats/page.tsx**
   - Made component client-side with Suspense boundary
   - Added model selection dropdown
   - Dynamically loads stats images based on selected model
   - Fetches available models from backend
   - Supports URL query parameter for initial model selection

4. **public/stats/**
   - Created directory structure for model-specific stats:
     - `yolov11m-3class/`
     - `yolov11n-12class/`
     - `yolov8n-3class/`
   - Each directory should contain:
     - confusion_matrix.png
     - confusion_matrix_normalized.png
     - metrics_comparison.png
     - precision_plot.png
     - recall_plot.png
     - f1_score_plot.png
     - specificity_plot.png

## How to Use

### Backend Setup

1. Your model files are already in place:
   - `eco-backend/yoloMODEL_new_medium.pt` → YOLOv11m (3 classes)
   - `eco-backend/yoloMODEL_old_cls_12.pt` → YOLOv11n (12 classes) 
   - `eco-backend/yoloMODEL_old_cls.pt` → YOLOv8n (3 classes)

2. Start the backend server:
   ```bash
   cd eco-backend
   source .venv/bin/activate
   python manage.py runserver 0.0.0.0:8000
   ```

3. The backend will automatically load the correct model based on frontend selection

### Frontend Setup

1. Place your model statistics images in the respective directories under `public/stats/`

2. Users can select models from the dropdown in the header

3. The stats page will automatically update to show the correct statistics

## API Endpoints

### GET /api/models/
Returns list of available models:
```json
{
  "models": [
    {
      "key": "yolov11m-3class",
      "name": "YOLOv11m (3 Classes)",
      "classes": 3
    },
    {
      "key": "yolov11n-12class",
      "name": "YOLOv11n (12 Classes)",
      "classes": 12
    },
    {
      "key": "yolov8n-3class",
      "name": "YOLOv8n (3 Classes)",
      "classes": 3
    }
  ],
  "default": "yolov11n-12class"
}
```

### POST /api/classify/
Accepts FormData with:
- `image`: Image file
- `model` (optional): Model key (defaults to `yolov11n-12class`)

Returns classification results with model key.

## Features

- ✅ Model selection dropdown on main page
- ✅ Model selection dropdown on stats page
- ✅ Dynamic stats loading based on selected model
- ✅ URL parameter support for stats page
- ✅ Backend support for multiple models
- ✅ Model caching to avoid reloading
- ✅ Backward compatible with single model setup
