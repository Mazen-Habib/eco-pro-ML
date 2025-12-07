# Deploying to Render

This guide will help you deploy your YOLO Image Classification API to Render.

## 📋 Prerequisites

- A GitHub account (to push your code)
- A Render account (sign up at https://render.com)
- Your YOLO model file (`yoloMODEL.pt`) in the repository

## 🚀 Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create a Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name:** `eco-pro-api` (or your preferred name)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `eco-backend`
- **Runtime:** `Python 3`

**Build & Deploy:**
- **Build Command:** 
  ```bash
  ./build.sh
  ```

- **Start Command:**
  ```bash
  gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
  ```

### 3. Set Environment Variables

In the Render dashboard, add these environment variables:

| Key | Value | Description |
|-----|-------|-------------|
| `PYTHON_VERSION` | `3.11.0` | Python version |
| `DEBUG` | `False` | Disable debug mode |
| `SECRET_KEY` | `[generate-random-key]` | Django secret key (see below) |
| `ALLOWED_HOSTS` | `your-app.onrender.com` | Your Render domain |

**Generate a SECRET_KEY:**
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 4. Deploy

Click **"Create Web Service"** and Render will:
1. Clone your repository
2. Run `build.sh` (install deps, collect static, migrate)
3. Start your app with gunicorn

## 🧪 Testing Your Build Locally

Before deploying to Render, test the build process:

```bash
# Activate virtual environment
source .venv/bin/activate

# Run the build script
./build.sh

# Test with gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

Then visit: http://localhost:8000/api/classify/

## 📝 Important Notes

### Model File Size
- **If your YOLO model is large (>100MB):**
  1. Add `yoloMODEL.pt` to `.gitignore`
  2. Upload it separately using Render's persistent disk or environment-specific storage
  3. Or use Git LFS (Large File Storage)

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30-60 seconds (cold start)
- For always-on service, upgrade to paid tier

### CORS Configuration
- Update `ALLOWED_HOSTS` in your environment variables
- Add your frontend domain to `CORS_ALLOWED_ORIGINS` in settings.py

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify Python version compatibility

### App Won't Start
- Check if `PORT` environment variable is being used
- Verify start command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
- Check application logs for errors

### Static Files Not Loading
- Ensure `build.sh` runs `collectstatic`
- Verify `whitenoise` is in `requirements.txt`
- Check `STATIC_ROOT` and `STATIC_URL` in settings.py

## 📞 Support

For Render-specific issues, check:
- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com

For YOLO model issues:
- Check application logs in Render dashboard
- Ensure model file is accessible
- Verify ultralytics installation

---

## Quick Reference

**Build Command:**
```bash
./build.sh
```

**Start Command:**
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

**Test Endpoint:**
```bash
curl -X POST https://your-app.onrender.com/api/classify/ \
  -F "image=@test_image.jpg"
```
