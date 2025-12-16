# EcoSort - AI-Powered Recycling Classifier

**GitHub Repository**: [https://github.com/thehamzaihsan/eco-pro](https://github.com/thehamzaihsan/eco-pro)  
**Live Website**: [http://edopro.hamzaihsan.me](http://edopro.hamzaihsan.me)

## Complete Technical Documentation

### Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Dataset & Training](#dataset--training)
4. [Backend Documentation](#backend-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [API Reference](#api-reference)
7. [Data Flow](#data-flow)
8. [Deployment](#deployment)
9. [Development Guide](#development-guide)

---

## System Overview

**EcoSort** is an AI-powered waste classification system that automatically identifies and categorizes recyclable materials using computer vision. The application uses a YOLOv11 model trained on 12 waste categories to provide real-time classification through an interactive web interface.

### Key Features
- 🎯 Real-time waste classification using YOLOv11n model
- 📸 Support for image upload and camera capture
- 🎨 Interactive 3D-style conveyor belt animation
- 📊 Performance metrics and statistics dashboard
- 🔄 Live tracking of sorted items
- 🎨 Modern, responsive UI with dark mode support

### Technology Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Django 4.2, Django REST Framework, Python 3.x
- **ML Model**: YOLOv11n (Ultralytics YOLO)
- **API**: RESTful architecture
- **Deployment**: Render (Backend), Vercel (Frontend)

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Image Upload │  │ Conveyor Belt│  │ Recycling Bins│      │
│  │  Component   │→ │  Animation   │→ │   Component   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           ↓                                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Classification Service (lib/classify.ts)  │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS/REST API
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Django)                          │
│  ┌──────────────────────────────────────────────────┐       │
│  │              API Layer (views.py)                 │       │
│  │  ┌──────────────────┐  ┌──────────────────┐     │       │
│  │  │ ImageClassification│  │   ModelList     │     │       │
│  │  │      View         │  │     View        │     │       │
│  │  └──────────────────┘  └──────────────────┘     │       │
│  └─────────────────┬────────────────────────────────┘       │
│                    ↓                                         │
│  ┌──────────────────────────────────────────────────┐       │
│  │         YOLO Model Service (yolo_model.py)        │       │
│  │  - Model Loading & Caching                        │       │
│  │  - Inference Engine                               │       │
│  │  - Prediction Processing                          │       │
│  └──────────────────┬───────────────────────────────┘       │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────┐       │
│  │        YOLOv11n Model (yoloMODEL_old_cls_12.pt)  │       │
│  │        12 Classes: Paper, Cardboard, Plastic,     │       │
│  │        Vegetation, Biological, Metal, Clothes,    │       │
│  │        Glass, Trash, Shoes, Battery               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Model Architecture

The system uses **YOLOv11n** (nano variant) trained for classification:
- **Model Type**: Classification (not detection)
- **Classes**: 12 waste categories
- **Input**: RGB images (auto-resized)
- **Output**: Top-5 predictions with confidence scores
- **Framework**: Ultralytics YOLO v8+

---

## Dataset & Training

### Dataset Overview

The project includes comprehensive training datasets for waste classification:

**Total Images**: ~19,949 images across 12 categories

#### Dataset Structure

```
Dataset/
├── battery/               # 945 images
├── biological/            # 1,396 images
├── clothes/               # 5,325 images
├── metal/                 # 1,559 images
├── paper/                 # 1,550 images
├── shoes/                 # 1,977 images
├── trash/                 # 697 images
├── Vegetation/            # 436 images
├── Miscellaneous Trash/   # 495 images
└── Dataset/               # 3-class subset
    ├── cardboard/         # 1,352 images
    ├── glass/             # 2,431 images
    └── plastic/           # 1,786 images
```

#### Category Distribution

| Category              | Images | Percentage |
|-----------------------|--------|------------|
| Clothes               | 5,325  | 26.7%      |
| Glass                 | 2,431  | 12.2%      |
| Shoes                 | 1,977  | 9.9%       |
| Plastic               | 1,786  | 9.0%       |
| Metal                 | 1,559  | 7.8%       |
| Paper                 | 1,550  | 7.8%       |
| Biological            | 1,396  | 7.0%       |
| Cardboard             | 1,352  | 6.8%       |
| Battery               | 945    | 4.7%       |
| Trash                 | 697    | 3.5%       |
| Miscellaneous Trash   | 495    | 2.5%       |
| Vegetation            | 436    | 2.2%       |

**Note**: The dataset has some class imbalance, with "Clothes" being the most represented category and "Vegetation" the least.

### Training Notebook

**Location**: `Yolo medium 3 classes/TestingF.ipynb`

This Jupyter notebook contains the model training and evaluation pipeline:

#### Notebook Contents

1. **Model Loading**
   - Loads YOLOv11 medium model (`best.pt`)
   - Model size: ~20MB
   - Trained on 3-class subset (cardboard, glass, plastic)

2. **Dataset Processing**
   - Image preprocessing and augmentation
   - Train/validation/test split
   - Data normalization

3. **Model Evaluation**
   - Confusion matrix generation
   - Classification metrics (Precision, Recall, F1-Score, Specificity)
   - Performance visualization

4. **Output Metrics**
   ```
   Overall Metrics (3-class model):
   - Precision:    74.38%
   - Recall:       71.38%
   - F1 Score:     72.85%
   - Specificity:  90.93%
   
   Per-Class Performance:
   - Macro avg:    77.69%
   - Weighted avg: 78.16%
   ```

5. **Generated Files**
   - `best.pt` - Trained model weights
   - `confusion_matrix.png` - Raw confusion matrix
   - `confusion_matrix_normalized.png` - Normalized confusion matrix
   - `metrics_comparison.png` - Bar chart comparing metrics
   - `runs/` - Training run outputs and logs

### Model Training Process

The YOLOv11 models were trained using the following approach:

1. **Data Preparation**
   - Images collected from various sources
   - Manual labeling and verification
   - Quality control and deduplication

2. **Training Configuration**
   - Base model: YOLOv11n (nano) and YOLOv11m (medium)
   - Task: Classification
   - Image size: 224x224
   - Batch size: Varies by model
   - Epochs: Multiple iterations with early stopping

3. **12-Class Model** (`yoloMODEL_old_cls_12.pt`)
   - Trained on all 12 categories
   - Used for production deployment
   - Balanced for general waste classification

4. **3-Class Model** (`best.pt`)
   - Focused on cardboard, glass, plastic
   - Higher accuracy on specific recyclables
   - Used for specialized recycling scenarios

### Using the Training Notebook

To reproduce or modify the training:

```bash
# 1. Install Jupyter
pip install jupyter notebook

# 2. Navigate to notebook directory
cd "Yolo medium 3 classes"

# 3. Launch Jupyter
jupyter notebook TestingF.ipynb

# 4. Run cells to:
#    - Load existing model
#    - Evaluate on test set
#    - Generate performance metrics
#    - Export confusion matrices
```

### Dataset Augmentation

The training pipeline includes various augmentation techniques:
- Random rotation (±15 degrees)
- Random horizontal flip
- Color jittering
- Random crop and resize
- Brightness/contrast adjustment

### Model Export

Models are exported in PyTorch format (`.pt`):
```python
from ultralytics import YOLO

# Train model
model = YOLO('yolov11n-cls.yaml')
results = model.train(data='dataset.yaml', epochs=100)

# Export trained model
model.export(format='torchscript')
```

---

## Backend Documentation

### Directory Structure

```
eco-backend/
├── config/                 # Django project settings
│   ├── settings.py        # Main configuration
│   ├── urls.py            # Root URL routing
│   └── wsgi.py            # WSGI application
├── classifier/            # Main application
│   ├── views.py          # API endpoints
│   ├── models.py         # Database models (empty)
│   ├── serializers.py    # DRF serializers
│   ├── yolo_model.py     # YOLO model wrapper
│   └── urls.py           # App URL routing
├── yoloMODEL_old_cls_12.pt  # YOLOv11n model file
├── requirements.txt      # Python dependencies
├── manage.py            # Django management
└── db.sqlite3           # SQLite database
```

### Core Components

#### 1. Settings Configuration (`config/settings.py`)

**Model Configuration**:
```python
YOLO_MODELS = {
    'yolov11n-12class': {
        'path': BASE_DIR / 'yoloMODEL_old_cls_12.pt',
        'classes': 12,
        'name': 'YOLOv11n (12 Classes)'
    }
}

DEFAULT_MODEL = 'yolov11n-12class'
```

**CORS Settings**:
```python
CORS_ALLOW_ALL_ORIGINS = True  # Development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://ecopro.hamzaihsan.me"
]
```

**REST Framework**:
```python
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.JSONParser',
    ],
}
```

#### 2. YOLO Model Service (`classifier/yolo_model.py`)

**Singleton Pattern Implementation**:
```python
class YOLOModel:
    _instances = {}
    
    def __new__(cls, model_key=None):
        if model_key not in cls._instances:
            instance = super(YOLOModel, cls).__new__(cls)
            cls._instances[model_key] = instance
            instance._initialized = False
        return cls._instances[model_key]
```

**Key Features**:
- **Singleton Pattern**: Ensures only one model instance per model key
- **Lazy Loading**: Model loaded on first use
- **Dual Backend Support**: Works with Ultralytics or pure PyTorch
- **Classification Support**: Handles YOLO classification models
- **Error Handling**: Graceful fallback and informative errors

**Prediction Flow**:
1. Load model (if not already loaded)
2. Run inference on image
3. Extract top-5 predictions with confidence scores
4. Return structured prediction data

**Model Output Format**:
```python
[
    {
        'class_id': 0,
        'class_name': 'paper',
        'confidence': 0.95
    },
    # ... up to 5 predictions
]
```

#### 3. API Views (`classifier/views.py`)

##### ImageClassificationView
**Endpoint**: `POST /api/classify/`

**Purpose**: Classifies uploaded images using YOLO model

**Request**:
- `image`: Image file (multipart/form-data)
- `model`: Optional model key (default: yolov11n-12class)

**Response**:
```json
{
    "message": "Image classified successfully",
    "predictions": [
        {
            "class_id": 2,
            "class_name": "plastic",
            "confidence": 0.87
        }
    ],
    "count": 1,
    "model": "yolov11n-12class"
}
```

**Processing Steps**:
1. Validate image upload (max 10MB)
2. Save to temporary file
3. Load appropriate YOLO model
4. Run prediction
5. Format and return results
6. Clean up temporary file

##### ModelListView
**Endpoint**: `GET /api/models/`

**Purpose**: Returns available models and default model

**Response**:
```json
{
    "models": [
        {
            "key": "yolov11n-12class",
            "name": "YOLOv11n (12 Classes)",
            "classes": 12
        }
    ],
    "default": "yolov11n-12class"
}
```

#### 4. Serializers (`classifier/serializers.py`)

**ImageUploadSerializer**:
- Validates image file format
- Enforces 10MB size limit
- Supports common image formats (JPEG, PNG, etc.)

**PredictionSerializer**:
- Structures prediction output
- Fields: class_name, confidence, class_id

### Dependencies (`requirements.txt`)

```
Django>=4.2.0              # Web framework
djangorestframework>=3.14.0 # REST API
django-cors-headers>=4.0.0  # CORS support
Pillow>=10.0.0             # Image processing
gunicorn>=21.2.0           # Production server
whitenoise>=6.5.0          # Static files
ultralytics>=8.0.0         # YOLO model
```

### Database

The application uses **SQLite** for simplicity:
- No custom models defined
- Uses default Django tables only
- Database file: `db.sqlite3`

---

## Frontend Documentation

### Directory Structure

```
eco-pro/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (proxies)
│   │   └── classify/
│   │       └── route.ts   # Classification proxy
│   ├── stats/            # Statistics page
│   │   └── page.tsx
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── recycling-plant.tsx    # Main orchestrator
│   ├── image-uploader.tsx     # Upload interface
│   ├── conveyor-belt.tsx      # Conveyor animation
│   ├── recycling-bins.tsx     # Bin display
│   ├── trash-item.tsx         # Animated items
│   ├── connection-test-modal.tsx
│   └── ui/                    # shadcn/ui components
├── lib/                   # Utility functions
│   ├── classify.ts       # Classification logic
│   └── utils.ts          # Helper functions
├── styles/               # Additional styles
├── public/              # Static assets
│   └── stats/           # Model statistics images
├── next.config.mjs      # Next.js config
└── package.json         # Dependencies
```

### Core Components

#### 1. RecyclingPlant (`components/recycling-plant.tsx`)

**Purpose**: Main orchestrator component that manages the entire application state and workflow.

**State Management**:
```typescript
interface ProcessingItem {
  id: string
  imageUrl: string
  category: TrashCategory | null
  status: "entering" | "traveling" | "classified" | "dropping" | "done"
  position: number  // 0-100 on conveyor belt
}

const [items, setItems] = useState<ProcessingItem[]>([])
const [stats, setStats] = useState<Record<TrashCategory, number>>({...})
const [activeBin, setActiveBin] = useState<TrashCategory | null>(null)
const [selectedModel, setSelectedModel] = useState<string>("yolov11n-12class")
```

**Key Features**:
- Model selection dropdown
- Item processing queue
- Statistics tracking
- Animation timing coordination
- Navigation to stats page

**Processing Timeline** (handleImageUpload):
1. **T+0ms**: Create item with status "entering"
2. **T+300ms**: Status → "traveling", Position → 50%
3. **T+2300ms**: Call classification API
4. **T+2300ms**: Status → "classified" (when API returns)
5. **T+3100ms**: Position → 95%
6. **T+4100ms**: Status → "dropping", activate bin
7. **T+4700ms**: Remove item, update stats

#### 2. ImageUploader (`components/image-uploader.tsx`)

**Purpose**: Handles image input via drag-drop, file selection, or camera capture.

**Features**:
- Drag and drop interface
- File browser integration
- Camera capture with live preview
- Image compression (JPEG, 90% quality)
- Visual feedback during upload

**Camera Implementation**:
```typescript
const stream = await navigator.mediaDevices.getUserMedia({ 
  video: { 
    facingMode: { ideal: "environment" },
    width: { ideal: 1280 },
    height: { ideal: 720 }
  } 
})
```

**Output**: Base64-encoded data URL

#### 3. ConveyorBelt (`components/conveyor-belt.tsx`)

**Purpose**: Renders animated conveyor belt with scanning beam.

**Visual Elements**:
- Side rails (top/bottom)
- Moving belt surface with texture
- Rotating wheels (left/right)
- Center scanning beam (vertical line)
- Overflow container for items

**Animations**:
- Belt: Horizontal moving stripes
- Wheels: Continuous rotation (1s duration)
- Scanner: Pulsing effect

#### 4. RecyclingBins (`components/recycling-bins.tsx`)

**Purpose**: Displays collection bins for each waste category.

**Bin Configuration**:
```typescript
const bin12Classes: TrashCategory[] = [
  "paper", "cardboard", "plastic", "vegetation", 
  "biological", "metal", "clothes", "glass", 
  "trash", "shoes", "battery"
]
```

**Visual Features**:
- 3D-style bin with lid, body, and base
- Opening lid animation when receiving item
- Fill level indicator (15% per item, max 85%)
- Count badge
- Color-coded by category
- Glow effect when active
- Icon representation

**Bin Anatomy**:
```
┌─────────────┐  ← Lid (rotates when active)
│   Handle    │
├─────────────┤  ← Dark opening
│             │
│    Icon     │  ← Main body with icon
│             │
│   (Fill)    │  ← Dynamic fill level
└─────────────┘  ← Base
```

#### 5. TrashItem (`components/trash-item.tsx`)

**Purpose**: Represents individual waste items traveling on conveyor.

**States**:
- **entering**: Fading in at position 0
- **traveling**: Moving to center
- **classified**: At scanning position with result badge
- **dropping**: Falling into bin
- **done**: Removed from DOM

**Visual Elements**:
- Circular image container
- Category badge (appears when classified)
- Drop shadow
- Position-based transforms

#### 6. Classification Service (`lib/classify.ts`)

**Purpose**: Handles communication with backend API and category mapping.

**Category Mapping**:
```typescript
const classNameMap: Record<string, TrashCategory> = {
  'paper': 'paper',
  'cardboard': 'cardboard',
  'plastic': 'plastic',
  'vegetation': 'vegetation',
  'biological': 'biological',
  'metal': 'metal',
  'clothes': 'clothes',
  'glass': 'glass',
  'miscellaneous trash': 'trash',
  'trash': 'trash',
  'shoes': 'shoes',
  'battery': 'battery',
}
```

**Error Handling**:
- Falls back to random category on error
- Logs warnings for debugging
- Never throws to ensure UI stability

**API Call Flow**:
1. Convert base64 URL to Blob
2. Create FormData with image file
3. POST to `/api/classify` (Next.js proxy)
4. Parse response predictions
5. Map class name to TrashCategory
6. Return category

#### 7. API Proxy (`app/api/classify/route.ts`)

**Purpose**: Proxies requests from frontend to Django backend.

**Why Proxy?**:
- Avoids CORS issues in production
- Centralizes backend URL configuration
- Allows request/response transformation
- Provides error handling layer

**Environment Variable**:
```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

#### 8. Statistics Page (`app/stats/page.tsx`)

**Purpose**: Displays model performance metrics with visualizations.

**Metrics Displayed**:
1. **Confusion Matrix**: Raw prediction vs actual
2. **Normalized Confusion Matrix**: Percentage-based
3. **Metrics Comparison**: Bar chart of P/R/F1
4. **Precision Plot**: Per-category precision
5. **Recall Plot**: Per-category recall
6. **F1 Score Plot**: Harmonic mean
7. **Specificity Plot**: True negative rate

**Image Paths**:
```
/public/stats/yolov11n-12class/confusion_matrix.png
/public/stats/yolov11n-12class/precision_plot.png
...
```

### Category Configuration

All 12 waste categories with visual properties:

| Category    | Icon | Color   | Description         |
|-------------|------|---------|---------------------|
| paper       | 📄   | #e8e8e8 | Paper products      |
| cardboard   | 📦   | #c9b458 | Cardboard boxes     |
| plastic     | 🥤   | #5b9bd5 | Plastic containers  |
| vegetation  | 🌿   | #7cb342 | Plant matter        |
| biological  | 🍂   | #8d6e63 | Organic waste       |
| metal       | 🔩   | #9e9e9e | Metal items         |
| clothes     | 👕   | #ab47bc | Textiles/fabric     |
| glass       | 🍾   | #45b7d1 | Glass bottles/jars  |
| trash       | 🗑️   | #424242 | General waste       |
| shoes       | 👟   | #6d4c41 | Footwear            |
| battery     | 🔋   | #ffd54f | Batteries           |

### Styling

**Framework**: Tailwind CSS v4.1.9

**Theme System**: 
- CSS variables for colors
- Dark mode support via `next-themes`
- Custom animations in `globals.css`

**Key Animations**:
```css
@keyframes conveyor {
  from { background-position: 0 0, 0 0; }
  to { background-position: 40px 0, 40px 0; }
}

@keyframes bin-receive {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes splash-ring {
  from { transform: scale(0.8); opacity: 0.8; }
  to { transform: scale(1.5); opacity: 0; }
}
```

---

## API Reference

### Backend Endpoints

#### POST /api/classify/

Classify an uploaded image.

**Request**:
```
Content-Type: multipart/form-data

image: <file>
model: "yolov11n-12class" (optional)
```

**Success Response** (200):
```json
{
  "message": "Image classified successfully",
  "predictions": [
    {
      "class_id": 2,
      "class_name": "plastic",
      "confidence": 0.8742
    },
    {
      "class_id": 0,
      "class_name": "paper",
      "confidence": 0.0523
    }
  ],
  "count": 2,
  "model": "yolov11n-12class"
}
```

**Error Response** (400):
```json
{
  "error": "Invalid model key. Available models: ['yolov11n-12class']"
}
```

**Error Response** (500):
```json
{
  "error": "Model file not found"
}
```

#### GET /api/models/

List available models.

**Success Response** (200):
```json
{
  "models": [
    {
      "key": "yolov11n-12class",
      "name": "YOLOv11n (12 Classes)",
      "classes": 12
    }
  ],
  "default": "yolov11n-12class"
}
```

---

## Data Flow

### Complete Request-Response Cycle

```
1. User uploads image
   └─> ImageUploader component

2. Image converted to base64 data URL
   └─> handleImageUpload in RecyclingPlant

3. Create ProcessingItem with status "entering"
   └─> Add to items array

4. Trigger animations (entering → traveling)
   └─> Update position and status

5. Call classifyTrash(imageUrl, modelKey)
   ├─> Convert data URL to File blob
   ├─> Create FormData
   └─> POST to /api/classify

6. Next.js API proxy receives request
   └─> Forward to Django backend

7. Django ImageClassificationView
   ├─> Validate image
   ├─> Save to temp file
   ├─> Load YOLO model (singleton)
   ├─> Run model.predict(image_path)
   ├─> Extract top-5 predictions
   ├─> Clean up temp file
   └─> Return JSON response

8. Frontend receives predictions
   ├─> Map class_name to TrashCategory
   └─> Return category

9. Update item status to "classified"
   └─> Display category badge

10. Continue animations
    ├─> Move to end position
    ├─> Set status "dropping"
    └─> Activate target bin

11. Bin animation
    ├─> Open lid
    ├─> Show glow effect
    └─> Close lid

12. Update statistics
    ├─> Increment category count
    └─> Update bin fill level

13. Remove item from items array
    └─> Process complete
```

### State Management Flow

```
RecyclingPlant (Parent State)
├─> items: ProcessingItem[]
├─> stats: Record<TrashCategory, number>
├─> activeBin: TrashCategory | null
└─> selectedModel: string

Props Flow:
├─> ImageUploader
│   └─> onUpload(imageUrl) → callback to parent
├─> ConveyorBelt
│   └─> children: TrashItem components
├─> TrashItem (multiple)
│   └─> item: ProcessingItem
└─> RecyclingBins
    ├─> stats: category counts
    ├─> activeBin: currently receiving
    └─> modelClasses: 12
```

---

## Deployment

### Backend Deployment (Render)

**Service Type**: Web Service

**Build Command**:
```bash
cd eco-backend && pip install -r requirements.txt && python manage.py collectstatic --noinput
```

**Start Command**:
```bash
cd eco-backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

**Environment Variables**:
```
PYTHON_VERSION=3.11
SECRET_KEY=<your-secret-key>
DEBUG=False
ALLOWED_HOSTS=.onrender.com,ecopro.hamzaihsan.me
CORS_ALLOWED_ORIGINS=https://ecopro.hamzaihsan.me
```

**Files Required**:
- `requirements.txt`
- `yoloMODEL_old_cls_12.pt` (model file)
- All Django source files

### Frontend Deployment (Vercel)

**Framework Preset**: Next.js

**Build Command**:
```bash
next build
```

**Output Directory**: `.next`

**Environment Variables**:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

**Domain**: Custom domain configured via Vercel DNS

---

## Development Guide

### Prerequisites

- **Node.js**: v18+ 
- **Python**: 3.9+
- **pnpm/npm**: Latest version

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd eco-backend
```

2. **Create virtual environment**:
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Run migrations**:
```bash
python manage.py migrate
```

5. **Start development server**:
```bash
python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to project root**:
```bash
cd eco-pro
```

2. **Install dependencies**:
```bash
pnpm install
# or
npm install
```

3. **Create environment file**:
```bash
echo "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000" > .env.local
```

4. **Start development server**:
```bash
pnpm dev
# or
npm run dev
```

Frontend runs at: `http://localhost:3000`

### Testing the System

1. **Verify backend is running**:
```bash
curl http://127.0.0.1:8000/api/models/
```

2. **Test classification** (with image file):
```bash
curl -X POST http://127.0.0.1:8000/api/classify/ \
  -F "image=@test_image.jpg"
```

3. **Open frontend**:
```
Navigate to http://localhost:3000
Upload test image
Verify classification works
```

### Development Workflow

1. **Make backend changes**:
   - Edit files in `eco-backend/classifier/`
   - Django auto-reloads on file changes
   - Test endpoints with curl or Postman

2. **Make frontend changes**:
   - Edit files in `app/` or `components/`
   - Next.js hot-reloads automatically
   - Check browser console for errors

3. **Add new category**:
   - Update model training data
   - Retrain YOLOv11 model
   - Update `TrashCategory` type in `lib/classify.ts`
   - Add to `categoryConfig`
   - Update `bin12Classes` array

4. **Update styling**:
   - Modify `app/globals.css`
   - Use Tailwind classes in components
   - Check responsive design (mobile/tablet/desktop)

### Debugging

**Backend Issues**:
```bash
# Check Django logs
python manage.py runserver --verbosity 3

# Test model loading
python manage.py shell
>>> from classifier.yolo_model import get_yolo_model
>>> model = get_yolo_model()
>>> print(model._model)
```

**Frontend Issues**:
```bash
# Check build errors
pnpm build

# Inspect network requests in browser DevTools
# Check Console for JavaScript errors
# Verify NEXT_PUBLIC_BACKEND_URL is set correctly
```

**API Issues**:
- Verify CORS settings in Django
- Check network tab in browser DevTools
- Test with curl to isolate frontend vs backend
- Verify image file size (<10MB)

### Code Quality

**Backend**:
```bash
# Format with Black
black eco-backend/

# Type checking (if using mypy)
mypy eco-backend/
```

**Frontend**:
```bash
# Lint with ESLint
pnpm lint

# Type checking
pnpm build  # TypeScript checked during build
```

---

## Model Information

### YOLOv11n-12class

**Model File**: `yoloMODEL_old_cls_12.pt`

**Architecture**:
- Base: YOLOv11n (nano variant)
- Task: Image classification
- Parameters: ~2.6M
- Input size: 224x224 (auto-resized)

**Training Details**:
- Dataset: Custom waste classification dataset
- Classes: 12 (paper, cardboard, plastic, vegetation, biological, metal, clothes, glass, trash, shoes, battery)
- Epochs: Unknown (pre-trained model)
- Framework: Ultralytics YOLOv8+

**Performance**:
- Inference time: ~50-200ms (CPU)
- Accuracy metrics: See `/stats` page
- Top-5 predictions returned

**Usage Example**:
```python
from ultralytics import YOLO

model = YOLO('yoloMODEL_old_cls_12.pt')
results = model('test_image.jpg')

for result in results:
    probs = result.probs
    top5_idx = probs.top5
    top5_conf = probs.top5conf
    
    for idx, conf in zip(top5_idx, top5_conf):
        print(f"{result.names[idx]}: {conf:.2%}")
```

---

## Security Considerations

1. **File Upload**:
   - 10MB size limit enforced
   - File type validation (images only)
   - Temporary files cleaned up after processing
   - No persistent storage of uploaded images

2. **API Security**:
   - CORS configured for specific domains
   - No authentication required (public demo)
   - Rate limiting should be added for production

3. **Environment Variables**:
   - SECRET_KEY kept secret in production
   - Backend URL configurable
   - Debug mode disabled in production

4. **Data Privacy**:
   - No user data stored
   - Images processed in-memory
   - No tracking or analytics (except Vercel Analytics)

---

## Performance Optimization

### Backend
- **Model Caching**: Singleton pattern prevents re-loading
- **Static Files**: Served via WhiteNoise
- **Gunicorn**: Multi-worker production server

### Frontend
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic with App Router
- **CSS**: Tailwind purges unused styles
- **Lazy Loading**: Components loaded on demand

### Network
- **API Proxy**: Reduces CORS overhead
- **Base64 Images**: Inline for small images
- **Compression**: Gzip enabled on server

---

## Troubleshooting

### Common Issues

**Issue**: Classification returns random category
- **Cause**: Backend connection failed
- **Fix**: Check NEXT_PUBLIC_BACKEND_URL, verify backend is running

**Issue**: Model loading error
- **Cause**: Missing model file or ultralytics
- **Fix**: Ensure `yoloMODEL_old_cls_12.pt` exists, reinstall ultralytics

**Issue**: CORS error in browser
- **Cause**: Backend not allowing frontend origin
- **Fix**: Add frontend URL to CORS_ALLOWED_ORIGINS in Django settings

**Issue**: Image upload fails
- **Cause**: File size too large
- **Fix**: Compress image or increase MAX_SIZE in serializer

**Issue**: Animations not smooth
- **Cause**: Too many items processing
- **Fix**: Limit concurrent items or optimize CSS animations

---

## Future Enhancements

### Planned Features
1. User authentication and history
2. Batch image upload
3. Real-time camera classification
4. Mobile app (React Native)
5. Export statistics as PDF
6. Multi-language support
7. Accessibility improvements (WCAG 2.1)
8. Offline mode with service workers

### Model Improvements
1. Train on larger dataset
2. Add more waste categories
3. Object detection mode (bounding boxes)
4. Confidence threshold configuration
5. Model A/B testing

---

## License & Credits

**License**: MIT (or specify your license)

**Credits**:
- **YOLO**: Ultralytics - https://github.com/ultralytics/ultralytics
- **UI Components**: shadcn/ui - https://ui.shadcn.com/
- **Icons**: Lucide React - https://lucide.dev/
- **Framework**: Next.js - https://nextjs.org/
- **Backend**: Django - https://www.djangoproject.com/

---

## Contact & Support

For questions, issues, or contributions:
- **GitHub**: [Your Repository URL]
- **Email**: [Your Email]
- **Demo**: https://ecopro.hamzaihsan.me

---

**Last Updated**: December 10, 2025
**Version**: 1.0.0
**Model Version**: YOLOv11n-12class
