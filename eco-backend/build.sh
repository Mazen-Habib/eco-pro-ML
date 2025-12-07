#!/bin/bash
# Render Build Script - Simulates production build process

set -e  # Exit on error

echo "================================"
echo "🏗️  Starting Render Build Process"
echo "================================"
echo ""

# Step 1: Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt --quiet
echo "✅ Dependencies installed"
echo ""

# Step 2: Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput --clear
echo "✅ Static files collected"
echo ""

# Step 3: Run database migrations
echo "🗄️  Running database migrations..."
python manage.py migrate --noinput
echo "✅ Migrations applied"
echo ""

# Step 4: Check Django configuration
echo "🔍 Checking Django configuration..."
python manage.py check --deploy
echo "✅ Configuration check passed"
echo ""

echo "================================"
echo "✅ Build completed successfully!"
echo "================================"
echo ""
echo "To start the server (locally):"
echo "  gunicorn config.wsgi:application --bind 0.0.0.0:8000"
echo ""
echo "For Render deployment, use this Start Command:"
echo "  gunicorn config.wsgi:application --bind 0.0.0.0:\$PORT"
echo ""
