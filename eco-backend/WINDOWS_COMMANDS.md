# Quick Reference - Windows Backend Commands

## 🚀 First Time Setup
```cmd
cd path\to\eco-pro\eco-backend
setup.bat
```

## ▶️ Start Development Server
```cmd
start_server.bat
```
Access at: http://localhost:8000

## 🔧 Manual Commands

### Activate Virtual Environment
```cmd
.venv\Scripts\activate
```

### Start Server Manually
```cmd
python manage.py runserver 0.0.0.0:8000
```

### Run Migrations
```cmd
python manage.py migrate
```

### Create Superuser (Admin)
```cmd
python manage.py createsuperuser
```

### Collect Static Files
```cmd
python manage.py collectstatic
```

## 🧪 Test API

### With Python Script
```cmd
python test_api.py test_image.jpg
```

### With curl (if installed)
```cmd
curl -X POST -F "image=@test_image.jpg" http://localhost:8000/api/classify/
```

## 🛑 Stop Server
Press `Ctrl + C` in the terminal

## 🏭 Production Server (Windows)
```cmd
start_production.bat
```
Uses Waitress instead of Django dev server

## 📋 Common Tasks

### Install New Package
```cmd
.venv\Scripts\activate
pip install package-name
pip freeze > requirements.txt
```

### Update Dependencies
```cmd
.venv\Scripts\activate
pip install -r requirements.txt --upgrade
```

### Clear Cache/Reset
```cmd
del db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### View Server Logs
Server logs display directly in terminal

## 🔍 Troubleshooting Quick Fixes

### Python not found
```cmd
# Check Python installation
where python

# Install from python.org if not found
```

### Port 8000 in use
```cmd
# Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Module not found
```cmd
.venv\Scripts\activate
pip install -r requirements.txt
```

### PowerShell script execution
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📁 File Locations

| File | Purpose |
|------|---------|
| `setup.bat` | One-time setup |
| `start_server.bat` | Start dev server |
| `start_production.bat` | Start production server |
| `manage.py` | Django management |
| `requirements.txt` | Dependencies |
| `.venv/` | Virtual environment |

## 🌐 URLs (when server running)

- API: http://localhost:8000/api/classify/
- Admin: http://localhost:8000/admin/
- API Docs: http://localhost:8000/api/docs/ (if configured)

## 💡 Tips

1. Always activate virtual environment before running commands
2. Use `start_server.bat` for development (auto-reload)
3. Use `start_production.bat` for production deployment
4. Keep terminal open while server is running
5. Check terminal for errors and logs

## 📞 Need Help?

- Check `WINDOWS_SETUP.md` for detailed guide
- GitHub: https://github.com/thehamzaihsan/eco-pro
- Website: http://edopro.hamzaihsan.me
