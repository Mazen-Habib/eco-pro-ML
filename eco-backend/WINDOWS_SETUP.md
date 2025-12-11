# Windows Setup and Start Guide for EcoSort Backend

## Prerequisites

1. **Python 3.8 or higher** - Download from [python.org](https://www.python.org/downloads/)
   - ✅ Make sure to check "Add Python to PATH" during installation
2. **Git** (optional) - For cloning the repository

## Quick Start (Windows)

### Option 1: Automatic Setup (Recommended)

1. **Open Command Prompt or PowerShell**
   ```cmd
   cd path\to\eco-pro\eco-backend
   ```

2. **Run setup script**
   ```cmd
   setup.bat
   ```
   - This will create virtual environment
   - Install all dependencies (takes 5-10 minutes)
   - Run database migrations

3. **Start the server**
   ```cmd
   start_server.bat
   ```
   - Server runs at http://localhost:8000
   - Press Ctrl+C to stop

### Option 2: Manual Setup

1. **Open Command Prompt or PowerShell**
   ```cmd
   cd path\to\eco-pro\eco-backend
   ```

2. **Create virtual environment**
   ```cmd
   python -m venv .venv
   ```

3. **Activate virtual environment**
   ```cmd
   .venv\Scripts\activate
   ```

4. **Install dependencies**
   ```cmd
   pip install -r requirements.txt
   ```

5. **Run migrations**
   ```cmd
   python manage.py migrate
   ```

6. **Start development server**
   ```cmd
   python manage.py runserver 0.0.0.0:8000
   ```

## Available Scripts

### `setup.bat`
- Creates virtual environment
- Installs all dependencies
- Runs database migrations
- One-time setup script

### `start_server.bat`
- Starts Django development server
- Runs on http://localhost:8000
- Auto-reloads on code changes
- **Use for development**

### `start_production.bat`
- Starts production server with Waitress
- Better performance than development server
- **Use for production/deployment**

## Testing the API

### Method 1: Using Python Test Script
```cmd
.venv\Scripts\activate
python test_api.py test_image.jpg
```

### Method 2: Using curl (if installed)
```cmd
curl -X POST -F "image=@test_image.jpg" http://localhost:8000/api/classify/
```

### Method 3: Using PowerShell
```powershell
$uri = "http://localhost:8000/api/classify/"
$filePath = "test_image.jpg"
$fileBytes = [System.IO.File]::ReadAllBytes($filePath)
$boundary = [System.Guid]::NewGuid().ToString()
$headers = @{"Content-Type" = "multipart/form-data; boundary=$boundary"}

Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -InFile $filePath
```

### Method 4: Using Browser
Open: http://localhost:8000/api/docs/ (if API docs are configured)

## Troubleshooting

### Python not found
```
'python' is not recognized as an internal or external command
```
**Solution:** Install Python and check "Add Python to PATH" during installation, or:
1. Search for "Environment Variables" in Windows
2. Edit PATH variable
3. Add Python installation directory (e.g., `C:\Python311\`)

### Virtual environment activation fails
If `.venv\Scripts\activate.bat` doesn't work, try:
```cmd
# PowerShell
.venv\Scripts\Activate.ps1

# Or set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Permission denied (PowerShell)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port 8000 already in use
```cmd
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
python manage.py runserver 8080
```

### ModuleNotFoundError
Make sure virtual environment is activated:
```cmd
.venv\Scripts\activate
pip install -r requirements.txt
```

### CUDA/GPU Issues
If you get CUDA errors on Windows without NVIDIA GPU:
```cmd
# Install CPU-only PyTorch
pip uninstall torch torchvision
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

## Firewall Issues

Windows Firewall might block the server. If you can't access from other devices:

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Allow Python through private/public networks

## Running in Background

### Method 1: Use `start` command
```cmd
start /B start_server.bat
```

### Method 2: Use Windows Task Scheduler
1. Open Task Scheduler
2. Create Basic Task
3. Trigger: At startup or login
4. Action: Start a program
5. Program: `cmd.exe`
6. Arguments: `/c "cd /d C:\path\to\eco-backend && start_production.bat"`

### Method 3: Install as Windows Service (Advanced)
```cmd
pip install pywin32
python -m win32serviceutil install
```

## Production Deployment on Windows Server

### Using IIS with wfastcgi

1. **Install IIS** with CGI support
2. **Install wfastcgi**
   ```cmd
   pip install wfastcgi
   wfastcgi-enable
   ```
3. **Configure web.config** (sample included in repo)
4. **Create IIS site** pointing to project directory

### Using Waitress (Simpler)

Already included in `start_production.bat`:
```cmd
start_production.bat
```

Waitress is a production-quality WSGI server for Windows (replacement for Gunicorn which is Linux-only).

## Environment Variables (Windows)

### Temporary (current session)
```cmd
set DEBUG=False
set SECRET_KEY=your-secret-key
set ALLOWED_HOSTS=localhost,127.0.0.1
python manage.py runserver
```

### Permanent (system-wide)
```cmd
setx DEBUG "False"
setx SECRET_KEY "your-secret-key"
setx ALLOWED_HOSTS "localhost,127.0.0.1"
```

Or use GUI:
1. Search "Environment Variables"
2. Click "Environment Variables" button
3. Add new variables under User or System variables

## Comparison: Windows vs Linux Scripts

| Linux | Windows | Purpose |
|-------|---------|---------|
| `setup.sh` | `setup.bat` | Initial setup |
| `start_server.sh` | `start_server.bat` | Start dev server |
| `source .venv/bin/activate` | `.venv\Scripts\activate.bat` | Activate venv |
| Gunicorn | Waitress | Production server |

## Performance Notes

- Windows may have slightly slower startup than Linux
- YOLO model loading takes same time (~5-10 seconds)
- Inference speed is similar (depends on CPU/GPU)
- For best performance, use Linux/Docker in production

## Next Steps

1. ✅ Run `setup.bat`
2. ✅ Run `start_server.bat`
3. 🔄 Test API with `python test_api.py test_image.jpg`
4. 🔄 Integrate with frontend

## Support

- GitHub: https://github.com/thehamzaihsan/eco-pro
- Website: http://edopro.hamzaihsan.me

---

**Note:** For production deployment on Windows Server, consider using Docker instead for better performance and easier deployment.
