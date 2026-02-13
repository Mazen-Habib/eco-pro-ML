#!/bin/bash
# Simple script to start the Django YOLO API server

cd /home/hamzaihsan/Desktop/eco-pro/eco-backend

# Activate virtual environment
source .venv/bin/activate

# Start the server
python manage.py runserver 0.0.0.0:8000

