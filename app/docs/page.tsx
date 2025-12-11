"use client"

import Link from "next/link"
import { ArrowLeft, Code, Rocket, Settings, Zap, BookOpen, Database, Layers, Terminal, FileCode, CheckCircle2, AlertCircle } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-semibold">Documentation</span>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-4xl font-bold tracking-tight">EcoSort Documentation</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Complete guide to understanding, running, and deploying the AI-powered waste classification system
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Quick Start</h2>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Prerequisites
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Node.js</strong> v18 or higher</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Python</strong> 3.9 or higher</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>pnpm/npm</strong> (package manager)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Git</strong> for cloning the repository</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Backend Setup */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" />
                Backend Setup
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">1. Navigate to backend directory</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>cd eco-backend</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">2. Create virtual environment</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>{`python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\\Scripts\\activate   # Windows`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">3. Install dependencies</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>pip install -r requirements.txt</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">4. Run migrations</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>python manage.py migrate</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">5. Start server</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>python manage.py runserver</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    ✅ Backend runs at <code className="bg-muted px-1 rounded">http://127.0.0.1:8000</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Frontend Setup */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-500" />
                Frontend Setup
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">1. Install dependencies</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>pnpm install</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">2. Create environment file</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>{`echo "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000" > .env.local`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">3. Start development server</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>pnpm dev</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    ✅ Frontend runs at <code className="bg-muted px-1 rounded">http://localhost:3000</code>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">4. Open in browser</p>
                  <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                    <code>http://localhost:3000</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Overview */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">System Overview</h2>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-6">
              EcoSort is an AI-powered waste classification system that automatically identifies and categorizes recyclable materials using computer vision.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 Real-time Classification</h4>
                <p className="text-sm text-muted-foreground">
                  Instantly categorizes waste using YOLOv11n model
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📸 Multiple Input Methods</h4>
                <p className="text-sm text-muted-foreground">
                  Supports drag-drop, file upload, and camera capture
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📊 Performance Metrics</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed statistics and model performance analytics
                </p>
              </div>
            </div>

            <h4 className="font-semibold mb-3">12 Waste Categories:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: "📄", name: "Paper" },
                { icon: "📦", name: "Cardboard" },
                { icon: "🥤", name: "Plastic" },
                { icon: "🌿", name: "Vegetation" },
                { icon: "🍂", name: "Biological" },
                { icon: "🔩", name: "Metal" },
                { icon: "👕", name: "Clothes" },
                { icon: "🍾", name: "Glass" },
                { icon: "🗑️", name: "Trash" },
                { icon: "👟", name: "Shoes" },
                { icon: "🔋", name: "Battery" },
              ].map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Architecture</h2>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-primary">Frontend</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Next.js 16 (App Router)</li>
                    <li>• React 19</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS v4</li>
                    <li>• shadcn/ui components</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-primary">Backend</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Django 4.2</li>
                    <li>• Django REST Framework</li>
                    <li>• Python 3.x</li>
                    <li>• Ultralytics YOLO</li>
                    <li>• Gunicorn (production)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <h4 className="font-medium mb-3">Data Flow:</h4>
              <pre className="text-xs text-muted-foreground">
{`User Upload → Frontend (Next.js) → API Proxy → Django Backend
                                            ↓
                                     YOLO Model (YOLOv11n)
                                            ↓
                                     Classification Result
                                            ↓
                             Conveyor Animation + Bin Sorting
                                            ↓
                                    Statistics Update`}
              </pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">API Reference</h2>
          </div>
          
          <div className="space-y-6">
            {/* Classify Endpoint */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-mono rounded">POST</span>
                <code className="text-sm">/api/classify/</code>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Classifies an uploaded image using the YOLO model
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request:</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`Content-Type: multipart/form-data

image: <file>           # Required: Image file
model: "yolov11n-12class"  # Optional: Model key`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Success Response (200):</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`{
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
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Example cURL:</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`curl -X POST http://127.0.0.1:8000/api/classify/ \\
  -F "image=@test_image.jpg"`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Models Endpoint */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs font-mono rounded">GET</span>
                <code className="text-sm">/api/models/</code>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Returns list of available models and the default model
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Success Response (200):</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "models": [
    {
      "key": "yolov11n-12class",
      "name": "YOLOv11n (12 Classes)",
      "classes": 12
    }
  ],
  "default": "yolov11n-12class"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Example cURL:</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`curl http://127.0.0.1:8000/api/models/`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileCode className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Key Components</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Frontend Components</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">recycling-plant.tsx</code>
                  <p className="text-muted-foreground mt-1">Main orchestrator managing state and workflow</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">image-uploader.tsx</code>
                  <p className="text-muted-foreground mt-1">Handles image upload and camera capture</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">conveyor-belt.tsx</code>
                  <p className="text-muted-foreground mt-1">Animated conveyor belt with scanning beam</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">recycling-bins.tsx</code>
                  <p className="text-muted-foreground mt-1">3D-style bins with animations</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">trash-item.tsx</code>
                  <p className="text-muted-foreground mt-1">Individual items on conveyor</p>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Backend Components</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">views.py</code>
                  <p className="text-muted-foreground mt-1">API endpoints (classify, models)</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">yolo_model.py</code>
                  <p className="text-muted-foreground mt-1">YOLO model wrapper with singleton pattern</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">serializers.py</code>
                  <p className="text-muted-foreground mt-1">Request/response validation</p>
                </li>
                <li>
                  <code className="bg-muted px-2 py-1 rounded text-xs">settings.py</code>
                  <p className="text-muted-foreground mt-1">Django configuration and model paths</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Testing</h2>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">1. Verify Backend</h3>
                <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
{`# Check if backend is running
curl http://127.0.0.1:8000/api/models/

# Test classification
curl -X POST http://127.0.0.1:8000/api/classify/ \\
  -F "image=@path/to/test_image.jpg"`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">2. Test Frontend</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Navigate to <code className="bg-muted px-1 rounded">http://localhost:3000</code></li>
                  <li>• Upload a test image (drag-drop or click to browse)</li>
                  <li>• Watch the conveyor animation</li>
                  <li>• Verify item is sorted into correct bin</li>
                  <li>• Check stats counter increments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">3. Common Issues</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-500 text-sm">CORS Error</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Add frontend URL to <code className="bg-muted px-1 rounded">CORS_ALLOWED_ORIGINS</code> in Django settings
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-500 text-sm">Model Not Found</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ensure <code className="bg-muted px-1 rounded">yoloMODEL_old_cls_12.pt</code> exists in eco-backend directory
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-500 text-sm">Backend Connection Failed</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Check <code className="bg-muted px-1 rounded">NEXT_PUBLIC_BACKEND_URL</code> in .env.local
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Deployment</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Backend (Render)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">Build Command:</p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`cd eco-backend && pip install -r requirements.txt && python manage.py collectstatic --noinput`}
                  </pre>
                </div>
                <div>
                  <p className="font-medium mb-1">Start Command:</p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`cd eco-backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`}
                  </pre>
                </div>
                <div>
                  <p className="font-medium mb-1">Environment Variables:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground mt-2">
                    <li>• PYTHON_VERSION=3.11</li>
                    <li>• SECRET_KEY=your-secret-key</li>
                    <li>• DEBUG=False</li>
                    <li>• ALLOWED_HOSTS=.onrender.com</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Frontend (Vercel)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">Framework:</p>
                  <p className="text-muted-foreground">Next.js (auto-detected)</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Build Command:</p>
                  <pre className="bg-muted p-2 rounded text-xs">
{`next build`}
                  </pre>
                </div>
                <div>
                  <p className="font-medium mb-1">Environment Variables:</p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com`}
                  </pre>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    ✅ Custom domain: ecopro.hamzaihsan.me
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Dataset & Model Information</h2>
          </div>
          
          {/* Dataset Info */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Training Dataset</h3>
            
            <div className="mb-6">
              <p className="text-muted-foreground mb-4">
                The model was trained on a comprehensive dataset of waste images collected and manually labeled.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">~20K</p>
                    <p className="text-xs text-muted-foreground">Total Images</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Categories</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">5.3K</p>
                    <p className="text-xs text-muted-foreground">Largest Class</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">436</p>
                    <p className="text-xs text-muted-foreground">Smallest Class</p>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-3">Dataset Distribution:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>👕 Clothes</span>
                    <span className="font-medium">5,325 (26.7%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🍾 Glass</span>
                    <span className="font-medium">2,431 (12.2%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>👟 Shoes</span>
                    <span className="font-medium">1,977 (9.9%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🥤 Plastic</span>
                    <span className="font-medium">1,786 (9.0%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🔩 Metal</span>
                    <span className="font-medium">1,559 (7.8%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>📄 Paper</span>
                    <span className="font-medium">1,550 (7.8%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🍂 Biological</span>
                    <span className="font-medium">1,396 (7.0%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>📦 Cardboard</span>
                    <span className="font-medium">1,352 (6.8%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🔋 Battery</span>
                    <span className="font-medium">945 (4.7%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🗑️ Trash</span>
                    <span className="font-medium">697 (3.5%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🗑️ Miscellaneous</span>
                    <span className="font-medium">495 (2.5%)</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>🌿 Vegetation</span>
                    <span className="font-medium">436 (2.2%)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> The dataset shows some class imbalance. Data augmentation techniques were used during training to mitigate this.
                </p>
              </div>
            </div>

            <h4 className="font-medium mb-3">Training Notebook</h4>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <code className="bg-background px-2 py-1 rounded">Yolo medium 3 classes/TestingF.ipynb</code>
              </p>
              <p className="text-xs text-muted-foreground">
                Jupyter notebook containing model training, evaluation, and metrics generation.
                Includes confusion matrix generation and performance visualization.
              </p>
            </div>
          </div>

          {/* Model Info */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">YOLOv11n-12class Model</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Specifications</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Model: YOLOv11n (nano variant)</li>
                  <li>• Task: Image Classification</li>
                  <li>• Parameters: ~2.6M</li>
                  <li>• Input: 224x224 RGB images</li>
                  <li>• Output: Top-5 predictions</li>
                  <li>• Inference: ~50-200ms (CPU)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Performance</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Classes: 12 waste categories</li>
                  <li>• Framework: Ultralytics YOLO</li>
                  <li>• File: yoloMODEL_old_cls_12.pt</li>
                  <li>• Size: ~5.5MB</li>
                </ul>
                <Link 
                  href="/stats"
                  className="inline-block mt-3 text-sm text-primary hover:underline"
                >
                  View detailed metrics →
                </Link>
              </div>
            </div>

            <div className="mt-6 bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">Usage Example:</h4>
              <pre className="text-xs overflow-x-auto">
{`from ultralytics import YOLO

model = YOLO('yoloMODEL_old_cls_12.pt')
results = model('test_image.jpg')

for result in results:
    probs = result.probs
    top5_idx = probs.top5
    top5_conf = probs.top5conf
    
    for idx, conf in zip(top5_idx, top5_conf):
        print(f"{result.names[idx]}: {conf:.2%}")`}
              </pre>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Additional Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://github.com/ultralytics/ultralytics"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Ultralytics YOLO</h3>
              <p className="text-sm text-muted-foreground">
                Official documentation for YOLO models
              </p>
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Next.js Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Learn about Next.js features and API
              </p>
            </a>
            <a
              href="https://www.djangoproject.com/start/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">Django Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Getting started with Django framework
              </p>
            </a>
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful UI components used in this project
              </p>
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            For complete technical documentation, see{" "}
            <code className="bg-muted px-2 py-1 rounded">FULL_DOCUMENTATION.md</code>
          </p>
          <p className="mt-2">
            EcoSort v1.0.0 • Built with ❤️ using Next.js and Django
          </p>
        </div>
      </main>
    </div>
  )
}
