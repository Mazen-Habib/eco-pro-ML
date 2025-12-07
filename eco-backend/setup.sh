#!/bin/bash

echo "=== YOLO Image Classification API Setup ==="
echo ""

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

echo "Activating virtual environment..."
source .venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Running migrations..."
python manage.py migrate

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "To start the server, run:"
echo "  source .venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Then test the API with:"
echo "  python test_api.py <path_to_your_image>"
echo ""
