# YOLO Image Classification API

Django REST API for image classification using YOLO model.

## Setup

### Prerequisites

Your system needs either:
- **Option 1 (Recommended)**: Install `ultralytics` package (requires C compiler)
- **Option 2**: Install `torch` and `torchvision` (may require large downloads)

The API will automatically use whichever is available.

### Quick Start

1. **Install core dependencies:**
```bash
pip install django djangorestframework pillow
```

2. **Install YOLO package (choose one):**

**Option 1 - Ultralytics (recommended):**
```bash
pip install ultralytics
```

**Option 2 - PyTorch (if ultralytics fails):**
```bash
pip install torch torchvision
```

3. **Run migrations:**
```bash
python manage.py migrate
```

4. **Start the development server:**
```bash
python manage.py runserver
```

The server will start at `http://127.0.0.1:8000/`

## API Endpoints

### POST /api/classify/

Classify objects in an image using the YOLO model.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with an `image` field containing the image file

**Example using curl:**
```bash
curl -X POST http://127.0.0.1:8000/api/classify/ \
  -F "image=@path/to/your/image.jpg"
```

**Example using Python requests:**
```python
import requests

url = 'http://127.0.0.1:8000/api/classify/'
files = {'image': open('path/to/your/image.jpg', 'rb')}
response = requests.post(url, files=files)
print(response.json())
```

**Response:**
```json
{
  "message": "Image classified successfully",
  "predictions": [
    {
      "class_name": "person",
      "confidence": 0.95,
      "class_id": 0
    },
    {
      "class_name": "car",
      "confidence": 0.87,
      "class_id": 2
    }
  ],
  "count": 2
}
```

## Testing with Postman

1. Open Postman
2. Create a new POST request to `http://127.0.0.1:8000/api/classify/`
3. Go to Body tab
4. Select `form-data`
5. Add a key named `image` and change type to `File`
6. Upload your image file
7. Click Send

## Testing with Web Browser

Simply open `test_frontend.html` in your browser and upload an image. Make sure the Django server is running first!

## Testing with Command Line

```bash
# Using the test script
python test_api.py path/to/your/image.jpg

# Or using curl
curl -X POST http://127.0.0.1:8000/api/classify/ -F "image=@path/to/image.jpg"
```

## Project Structure

```
eco-backend/
├── manage.py
├── requirements.txt
├── yoloMODEL.pt          # Your YOLO model file
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── classifier/
    ├── __init__.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    ├── yolo_model.py
    └── migrations/
        └── __init__.py
```

## Notes

- The YOLO model is loaded once and reused for all predictions (singleton pattern)
- Images are temporarily stored during processing and deleted afterwards
- Maximum image size is 10MB (configurable in serializers.py)
- The API returns all detected objects with their class names and confidence scores
