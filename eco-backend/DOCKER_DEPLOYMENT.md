# Docker Deployment Guide for EcoSort Backend

## Files Created

1. **Dockerfile** - Container configuration
2. **docker-compose.yml** - Easy local deployment
3. **.dockerignore** - Optimizes build time

## Local Testing with Docker

### Using Docker

```bash
# Build the image
docker build -t eco-backend .

# Run the container
docker run -p 8000:8000 \
  -e DEBUG=True \
  -e SECRET_KEY=your-secret-key \
  -e ALLOWED_HOSTS=localhost,127.0.0.1 \
  eco-backend

# Access at http://localhost:8000
```

### Using Docker Compose (Recommended for local dev)

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

## Cloud Deployment Options

### 1. Render.com (Current Deployment)

Render can deploy directly from Dockerfile:

**Steps:**
1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Select "Docker" as environment
5. Set environment variables:
   ```
   SECRET_KEY=your-production-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com,.onrender.com
   ```
6. Deploy!

**render.yaml** (for automated deployment):
```yaml
services:
  - type: web
    name: eco-backend
    env: docker
    repo: https://github.com/thehamzaihsan/eco-pro
    dockerfilePath: ./eco-backend/Dockerfile
    dockerContext: ./eco-backend
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: False
      - key: ALLOWED_HOSTS
        value: .onrender.com,ecopro.hamzaihsan.me
```

### 2. AWS ECS (Elastic Container Service)

```bash
# Install AWS CLI and configure
aws configure

# Build and tag image
docker build -t eco-backend .
docker tag eco-backend:latest YOUR_ECR_REPO:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_REPO
docker push YOUR_ECR_REPO:latest

# Deploy via ECS Console or CLI
```

### 3. Google Cloud Run

```bash
# Install gcloud CLI
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/eco-backend

# Deploy
gcloud run deploy eco-backend \
  --image gcr.io/PROJECT_ID/eco-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="DEBUG=False,SECRET_KEY=your-key"
```

### 4. DigitalOcean App Platform

1. Create a new app from GitHub
2. Select Dockerfile deployment
3. Set environment variables in dashboard
4. Deploy automatically on push

### 5. Heroku

Create a `heroku.yml`:
```yaml
build:
  docker:
    web: Dockerfile
run:
  web: gunicorn --bind 0.0.0.0:$PORT config.wsgi:application
```

Deploy:
```bash
heroku create eco-backend
heroku stack:set container
git push heroku main
```

### 6. Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name eco-backend \
  --image YOUR_ACR_REGISTRY.azurecr.io/eco-backend:latest \
  --cpu 2 --memory 4 \
  --registry-login-server YOUR_ACR_REGISTRY.azurecr.io \
  --registry-username YOUR_USERNAME \
  --registry-password YOUR_PASSWORD \
  --dns-name-label eco-backend \
  --ports 8000 \
  --environment-variables \
    'SECRET_KEY'='your-secret-key' \
    'DEBUG'='False'
```

### 7. Fly.io

```bash
# Install flyctl
fly launch

# This will detect Dockerfile and create fly.toml
# Edit fly.toml if needed, then:
fly deploy
```

### 8. Railway.app

1. Connect GitHub repository
2. Railway auto-detects Dockerfile
3. Set environment variables in dashboard
4. Deploy automatically

## Environment Variables

Required environment variables for production:

```env
SECRET_KEY=generate-a-strong-random-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

Optional:
```env
DATABASE_URL=postgres://... (if using PostgreSQL)
CORS_ALLOWED_ORIGINS=https://your-frontend.com
```

## Production Optimizations

### 1. Use PostgreSQL instead of SQLite

Update `requirements.txt`:
```
psycopg2-binary>=2.9.0
```

Update `settings.py`:
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}
```

### 2. Multi-stage Build (Reduces image size)

```dockerfile
# Stage 1: Builder
FROM python:3.11-slim as builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 libsm6 libxext6 libgomp1 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120", "config.wsgi:application"]
```

### 3. Health Checks

Add to Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/health/').read()"
```

Add health endpoint in `classifier/views.py`:
```python
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})
```

## Monitoring and Logging

### View logs in Docker:
```bash
docker logs -f container-name
```

### View logs in Docker Compose:
```bash
docker-compose logs -f
```

## Scaling

For high traffic, use:
- More workers: `--workers 4` in gunicorn command
- Horizontal scaling: Deploy multiple containers behind a load balancer
- CDN for static files: Use Cloudflare or AWS CloudFront

## Troubleshooting

### Build takes too long
- The PyTorch and ML dependencies are large (~1GB+)
- Use Docker layer caching
- Consider using pre-built base images with ML packages

### Out of memory
- Increase container memory limits
- Reduce workers count
- Use smaller model if possible

### YOLO model not found
- Ensure `.pt` files are included in the image
- Check `.dockerignore` doesn't exclude models
- Models should be in the root directory: `yoloMODEL_new_medium.pt`

## Cost Comparison

| Platform | Free Tier | Paid (Basic) | Notes |
|----------|-----------|--------------|-------|
| Render | 750 hours/month | $7/month | Current deployment |
| Fly.io | 3 shared-cpu VMs | $2/month | Good for startups |
| Railway | 500 hours/month | $5/month | Easy setup |
| Google Cloud Run | 2M requests/month | Pay per use | Scales to zero |
| AWS ECS Fargate | No free tier | ~$15/month | Enterprise grade |
| DigitalOcean | No free tier | $5/month | Simple & reliable |
| Heroku | Deprecated | $7/month | Easy but expensive |

## Recommended Setup

**For Development:**
```bash
docker-compose up
```

**For Production (Best Value):**
- **Render.com** - Current setup, works great
- **Fly.io** - Better performance, similar price
- **Google Cloud Run** - Pay per use, scales automatically

**For Enterprise:**
- **AWS ECS** - Full control and scalability
- **Google Kubernetes Engine** - Advanced orchestration

## Next Steps

1. ✅ Dockerfile created and tested
2. ✅ Docker Compose for local development
3. 🔄 Choose deployment platform
4. 🔄 Set environment variables
5. 🔄 Configure domain and SSL
6. 🔄 Set up monitoring (optional)

## Support

For issues or questions:
- GitHub: https://github.com/thehamzaihsan/eco-pro
- Website: http://edopro.hamzaihsan.me
