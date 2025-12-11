# Docker Quick Start Guide

## ✅ Files Created

1. **Dockerfile** - Production-ready containerization
2. **docker-compose.yml** - Local development setup
3. **.dockerignore** - Optimized builds
4. **DOCKER_DEPLOYMENT.md** - Complete deployment guide

## 🚀 Quick Start

### Option 1: Docker (Production)

```bash
cd eco-backend

# Build
docker build -t eco-backend .

# Run
docker run -p 8000:8000 \
  -e DEBUG=True \
  -e SECRET_KEY=dev-secret-key \
  -e ALLOWED_HOSTS=localhost,127.0.0.1 \
  eco-backend
```

### Option 2: Docker Compose (Development - Recommended)

```bash
cd eco-backend

# Start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 3: Podman (Docker alternative)

```bash
cd eco-backend

# Build
podman build -t eco-backend .

# Run
podman run -p 8000:8000 \
  -e DEBUG=True \
  eco-backend
```

## 📦 What's Included

- Python 3.11 slim base image
- All required dependencies (Django, YOLO, etc.)
- Gunicorn WSGI server
- Static files collection
- Health checks ready
- Production optimized

## ⚙️ Build Notes

**First build takes 10-15 minutes** because it downloads:
- PyTorch (~900 MB)
- OpenCV (~67 MB)  
- Ultralytics YOLO (~45 MB)
- Other ML dependencies (~200 MB)

**Total image size:** ~3-4 GB (due to ML dependencies)

Subsequent builds use Docker layer caching and are much faster!

## 🌐 Deployment Options

### Easiest (Recommended)

1. **Render.com** - Current deployment, just push to GitHub
2. **Fly.io** - Run `fly launch` in the directory
3. **Railway.app** - Connect GitHub, auto-deploys

### Cloud Platforms

4. **Google Cloud Run** - Serverless, pay per use
5. **AWS ECS** - Enterprise-grade
6. **DigitalOcean** - Simple and affordable
7. **Azure Container Instances** - Microsoft cloud

See **DOCKER_DEPLOYMENT.md** for detailed instructions.

## 🔍 Testing

After starting the container:

```bash
# Check health
curl http://localhost:8000/api/health/

# Test classification
curl -X POST -F "image=@test_image.jpg" \
  http://localhost:8000/api/classify/
```

## 🐛 Troubleshooting

### Build is slow
- Normal! PyTorch is 900MB
- Use faster internet
- Layer caching helps on rebuilds

### Port already in use
```bash
# Use different port
docker run -p 8080:8000 eco-backend
```

### Permission denied
```bash
# Use sudo or add user to docker group
sudo docker build -t eco-backend .
```

### Out of disk space
```bash
# Clean up old containers/images
docker system prune -a
```

## 📊 Resource Requirements

- **Minimum:** 2 CPU cores, 4 GB RAM
- **Recommended:** 2 CPU cores, 8 GB RAM
- **Disk:** 5 GB free space

## 🔐 Environment Variables

Required:
- `SECRET_KEY` - Django secret key
- `DEBUG` - True for dev, False for production
- `ALLOWED_HOSTS` - Comma-separated domains

Optional:
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ALLOWED_ORIGINS` - Frontend URLs

## 📚 Next Steps

1. ✅ Dockerfile created
2. ✅ Tested successfully (build works)
3. 🔄 Choose deployment platform
4. 🔄 Set environment variables
5. 🔄 Deploy and test

## 📞 Support

- GitHub: https://github.com/thehamzaihsan/eco-pro
- Website: http://edopro.hamzaihsan.me

---

**Note:** The Docker build was tested and works correctly. Due to large ML dependencies (PyTorch, YOLO), first build takes time but results in a production-ready container!
