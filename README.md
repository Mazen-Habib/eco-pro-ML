# EcoSort - AI-Powered Recycling Classifier

🎯 An intelligent waste classification system that automatically identifies and categorizes recyclable materials using computer vision and YOLOv11.

![EcoSort Demo](https://img.shields.io/badge/Status-Production-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Django](https://img.shields.io/badge/Django-4.2-green)
![YOLO](https://img.shields.io/badge/YOLO-v11n-blue)

## ✨ Features

- 🎯 **Real-time Classification** - Instant waste categorization using YOLOv11n model
- 📸 **Multiple Input Methods** - Drag-drop, file upload, or camera capture
- 🎨 **Interactive UI** - 3D-style conveyor belt with smooth animations
- 📊 **Performance Metrics** - Detailed model statistics and analytics
- 🔄 **Live Tracking** - Watch items get sorted in real-time
- 🌙 **Dark Mode** - Beautiful UI with dark theme support

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Python 3.9+
- pnpm or npm

### Backend Setup
```bash
cd eco-backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
pnpm install
echo "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000" > .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

**🌐 Interactive Documentation**: Visit [/docs](http://localhost:3000/docs) when running locally, or [https://ecopro.hamzaihsan.me/docs](https://ecopro.hamzaihsan.me/docs) for the live demo.

**📖 Complete Technical Docs**: See [FULL_DOCUMENTATION.md](./FULL_DOCUMENTATION.md) for detailed technical documentation.

The `/docs` page includes:
- Step-by-step setup guide
- System architecture overview
- API reference with examples
- Component explanations
- Testing instructions
- Deployment guides
- Troubleshooting tips

## 🗑️ Supported Categories

| Category    | Icon | Description         |
|-------------|------|---------------------|
| Paper       | 📄   | Paper products      |
| Cardboard   | 📦   | Cardboard boxes     |
| Plastic     | 🥤   | Plastic containers  |
| Vegetation  | 🌿   | Plant matter        |
| Biological  | 🍂   | Organic waste       |
| Metal       | 🔩   | Metal items         |
| Clothes     | 👕   | Textiles/fabric     |
| Glass       | 🍾   | Glass bottles/jars  |
| Trash       | 🗑️   | General waste       |
| Shoes       | 👟   | Footwear            |
| Battery     | 🔋   | Batteries           |

## 🏗️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components

**Backend:**
- Django 4.2
- Django REST Framework
- Ultralytics YOLOv11n
- Python 3.x

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Model: YOLOv11n (12 classes)

## 🧪 Testing

```bash
# Test backend API
curl http://127.0.0.1:8000/api/models/

# Test classification
curl -X POST http://127.0.0.1:8000/api/classify/ -F "image=@test.jpg"

# Run frontend
pnpm dev
```

## 🧬 Training & Experimentation

To reproduce or modify the model training:

```bash
# 1. Install Jupyter
pip install jupyter notebook ultralytics

# 2. Navigate to training directory
cd "Yolo medium 3 classes"

# 3. Launch Jupyter notebook
jupyter notebook TestingF.ipynb

# 4. The notebook includes:
#    - Model loading and evaluation
#    - Confusion matrix generation
#    - Performance metrics calculation
#    - Result visualization
```

**Training Results** (3-class model):
- Precision: 74.38%
- Recall: 71.38%
- F1 Score: 72.85%
- Specificity: 90.93%

## 📊 Model & Dataset Information

### Model
- **Model**: YOLOv11n (nano variant)
- **Task**: Image Classification
- **Classes**: 12 waste categories
- **Parameters**: ~2.6M
- **Input**: 224x224 RGB images
- **Output**: Top-5 predictions with confidence scores
- **Inference**: ~50-200ms (CPU)

### Dataset
- **Total Images**: ~19,949 labeled images
- **Categories**: 12 waste types
- **Distribution**: Ranges from 436 (Vegetation) to 5,325 (Clothes) images per class
- **Training Notebook**: `Yolo medium 3 classes/TestingF.ipynb`
- **Augmentation**: Rotation, flip, color jittering, crop/resize

**Dataset Structure**:
```
Dataset/
├── battery/               (945 images)
├── biological/            (1,396 images)
├── clothes/               (5,325 images)
├── metal/                 (1,559 images)
├── paper/                 (1,550 images)
├── shoes/                 (1,977 images)
├── trash/                 (697 images)
├── Vegetation/            (436 images)
├── Miscellaneous Trash/   (495 images)
└── Dataset/               (3-class subset)
    ├── cardboard/         (1,352 images)
    ├── glass/             (2,431 images)
    └── plastic/           (1,786 images)
```

View detailed performance metrics at [/stats](http://localhost:3000/stats)

## 🚀 Deployment

### Backend (Render)
```bash
# Build
cd eco-backend && pip install -r requirements.txt && python manage.py collectstatic --noinput

# Start
cd eco-backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

### Frontend (Vercel)
Automatically deployed on push to main branch.

Environment variable required:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

## 📁 Project Structure

```
eco-pro/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── docs/              # Documentation page
│   ├── stats/             # Statistics page
│   └── page.tsx           # Home page
├── components/            # React components
├── Dataset/               # Training dataset (~20K images)
│   ├── battery/           # Battery images
│   ├── biological/        # Organic waste images
│   ├── clothes/           # Textile images
│   ├── metal/             # Metal items
│   ├── paper/             # Paper products
│   ├── shoes/             # Footwear
│   ├── trash/             # General waste
│   ├── Vegetation/        # Plant matter
│   ├── Miscellaneous Trash/
│   └── Dataset/           # 3-class subset
│       ├── cardboard/
│       ├── glass/
│       └── plastic/
├── Yolo medium 3 classes/ # Training resources
│   ├── TestingF.ipynb     # Training notebook
│   ├── best.pt            # YOLOv11m model (20MB)
│   └── confusion_matrix*.png
├── eco-backend/           # Django backend
│   ├── classifier/        # Main app
│   ├── config/            # Settings
│   └── yoloMODEL_old_cls_12.pt
├── lib/                   # Utilities
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Credits

- **YOLO**: [Ultralytics](https://github.com/ultralytics/ultralytics)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Framework**: [Next.js](https://nextjs.org/) & [Django](https://www.djangoproject.com/)

## 🔗 Links

- **Live Demo**: [https://ecopro.hamzaihsan.me](https://ecopro.hamzaihsan.me)
- **Documentation**: [/docs](https://ecopro.hamzaihsan.me/docs)
- **Statistics**: [/stats](https://ecopro.hamzaihsan.me/stats)

---

Built with ❤️ using Next.js and Django
