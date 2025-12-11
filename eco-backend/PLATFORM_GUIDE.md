# Platform Comparison Guide - Backend Server

## 🖥️ Quick Start Comparison

### Linux/Mac
```bash
cd eco-backend
./setup.sh
./start_server.sh
```

### Windows
```cmd
cd eco-backend
setup.bat
start_server.bat
```

### Docker (All Platforms)
```bash
cd eco-backend
docker-compose up
```

---

## 📋 Command Reference

| Task | Linux/Mac | Windows | Docker |
|------|-----------|---------|--------|
| **Setup** | `./setup.sh` | `setup.bat` | `docker-compose build` |
| **Start Dev Server** | `./start_server.sh` | `start_server.bat` | `docker-compose up` |
| **Start Production** | `gunicorn config.wsgi` | `start_production.bat` | Built-in |
| **Activate Venv** | `source .venv/bin/activate` | `.venv\Scripts\activate` | N/A |
| **Run Migrations** | `python manage.py migrate` | `python manage.py migrate` | `docker exec` |
| **Stop Server** | `Ctrl+C` | `Ctrl+C` | `docker-compose down` |

---

## 🏗️ Virtual Environment

### Linux/Mac
```bash
# Create
python3 -m venv .venv

# Activate
source .venv/bin/activate

# Deactivate
deactivate
```

### Windows Command Prompt
```cmd
# Create
python -m venv .venv

# Activate
.venv\Scripts\activate.bat

# Deactivate
deactivate
```

### Windows PowerShell
```powershell
# Create
python -m venv .venv

# Activate
.venv\Scripts\Activate.ps1

# Deactivate
deactivate
```

---

## 🌐 Server Access

All platforms:
- Local: http://localhost:8000
- Network: http://YOUR_IP:8000
- API: http://localhost:8000/api/classify/

---

## 🔧 Production Deployment

| Platform | Production Server | Command |
|----------|------------------|---------|
| **Linux** | Gunicorn | `gunicorn config.wsgi:application` |
| **Windows** | Waitress | `waitress-serve config.wsgi:application` |
| **Docker** | Gunicorn | Configured in Dockerfile |
| **Cloud** | Platform-specific | Auto-configured |

---

## 📦 Dependencies Installation

### All Platforms
```bash
pip install -r requirements.txt
```

### Docker
Dependencies installed during build - no manual installation needed!

---

## 🐛 Common Issues & Solutions

### Issue: Python not found

**Linux/Mac:**
```bash
# Install Python
sudo apt install python3 python3-pip  # Ubuntu/Debian
brew install python3                   # macOS
```

**Windows:**
Download from [python.org](https://python.org) and check "Add to PATH"

---

### Issue: Port 8000 in use

**Linux/Mac:**
```bash
# Find process
lsof -i :8000
# Kill process
kill -9 <PID>
```

**Windows:**
```cmd
# Find process
netstat -ano | findstr :8000
# Kill process
taskkill /PID <PID> /F
```

**Docker:**
```bash
docker-compose down
# Or use different port
# Edit docker-compose.yml: "8080:8000"
```

---

### Issue: Permission denied

**Linux/Mac:**
```bash
chmod +x setup.sh start_server.sh
```

**Windows:**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Docker:**
```bash
# Run with sudo if needed
sudo docker-compose up
```

---

## 🎯 Recommended Setup by Use Case

### Development on Your Computer
- **Windows:** Use `setup.bat` and `start_server.bat`
- **Linux/Mac:** Use `setup.sh` and `start_server.sh`
- **Any OS:** Use Docker for consistency

### Production Deployment
- **Best:** Docker (works everywhere)
- **Windows Server:** Use `start_production.bat` with Waitress
- **Linux Server:** Use Gunicorn with systemd/supervisor
- **Cloud:** Use Docker on Render, Fly.io, or Cloud Run

### Team Development
- **Docker** - Ensures everyone has same environment
- Prevents "works on my machine" issues

---

## ⚡ Performance Comparison

| Platform | Startup Time | Performance | Ease of Use |
|----------|-------------|-------------|-------------|
| **Linux Native** | Fast (5s) | Best | Medium |
| **Windows Native** | Medium (7s) | Good | Easy |
| **Docker (Linux)** | Medium (10s) | Best | Easy |
| **Docker (Windows)** | Slow (15s) | Good | Easy |
| **WSL2 (Windows)** | Fast (6s) | Best | Medium |

---

## 📚 File Structure

```
eco-backend/
├── setup.sh              # Linux/Mac setup
├── setup.bat             # Windows setup
├── start_server.sh       # Linux/Mac dev server
├── start_server.bat      # Windows dev server
├── start_production.bat  # Windows production
├── Dockerfile            # Docker build
├── docker-compose.yml    # Docker easy start
├── requirements.txt      # Python dependencies
├── manage.py             # Django management
├── WINDOWS_SETUP.md      # Windows guide
├── DOCKER_DEPLOYMENT.md  # Docker guide
└── WINDOWS_COMMANDS.md   # Quick reference
```

---

## 🚀 Getting Started - Choose Your Path

### Path 1: Native Installation (Traditional)
Good for learning, development, and understanding the stack.

**Linux/Mac:**
1. `cd eco-backend`
2. `./setup.sh`
3. `./start_server.sh`

**Windows:**
1. `cd eco-backend`
2. `setup.bat`
3. `start_server.bat`

### Path 2: Docker (Recommended)
Good for consistency, deployment, and team projects.

**All Platforms:**
1. `cd eco-backend`
2. `docker-compose up`

### Path 3: Cloud Deployment (Production)
Good for hosting and public access.

1. Push to GitHub
2. Connect to Render/Fly.io/Railway
3. Deploy automatically

---

## 💡 Pro Tips

1. **Use Docker for production** - Same environment everywhere
2. **Use native for development** - Faster iteration
3. **Use virtual environments** - Keep dependencies isolated
4. **Read platform-specific guides** - Details in separate docs
5. **Check troubleshooting sections** - Common issues covered

---

## 📞 Support

- **Full Documentation:** See README.md
- **Windows Help:** See WINDOWS_SETUP.md
- **Docker Help:** See DOCKER_DEPLOYMENT.md
- **GitHub:** https://github.com/thehamzaihsan/eco-pro
- **Website:** http://edopro.hamzaihsan.me

---

**Last Updated:** December 2024
