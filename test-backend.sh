#!/bin/bash

# Multi-Model Backend Test Script

echo "================================"
echo "EcoSort Multi-Model Backend Test"
echo "================================"
echo ""

# Test 1: Check if backend is running
echo "1. Testing backend connection..."
BACKEND_URL="http://127.0.0.1:8000"
if curl -s -f "$BACKEND_URL/api/models/" > /dev/null; then
    echo "   ✓ Backend is running"
else
    echo "   ✗ Backend is not responding"
    echo "   Please start the backend with: cd eco-backend && source .venv/bin/activate && python manage.py runserver 0.0.0.0:8000"
    exit 1
fi

# Test 2: Check available models
echo ""
echo "2. Checking available models..."
MODELS=$(curl -s "$BACKEND_URL/api/models/" | python3 -m json.tool)
echo "$MODELS" | grep -E '"name"|"classes"' | sed 's/^/   /'

# Test 3: Check model files
echo ""
echo "3. Checking model files..."
cd eco-backend
for model in yoloMODEL_new_medium.pt yoloMODEL_old_cls_12.pt yoloMODEL_old_cls.pt; do
    if [ -f "$model" ]; then
        SIZE=$(ls -lh "$model" | awk '{print $5}')
        echo "   ✓ $model ($SIZE)"
    else
        echo "   ✗ $model (missing)"
    fi
done

# Test 4: Test classification with each model
echo ""
echo "4. Testing classification with each model..."
TEST_IMAGE=".venv/lib/python3.14/site-packages/matplotlib/mpl-data/sample_data/grace_hopper.jpg"

if [ -f "$TEST_IMAGE" ]; then
    for model_key in yolov11m-3class yolov11n-12class yolov8n-3class; do
        echo "   Testing $model_key..."
        RESULT=$(curl -s -X POST -F "image=@$TEST_IMAGE" -F "model=$model_key" "$BACKEND_URL/api/classify/")
        if echo "$RESULT" | grep -q "class_name"; then
            CLASS=$(echo "$RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['predictions'][0]['class_name'] if data['predictions'] else 'No prediction')")
            CONF=$(echo "$RESULT" | python3 -c "import sys, json; data=json.load(sys.stdin); print(f\"{data['predictions'][0]['confidence']:.2f}\" if data['predictions'] else '0.00')")
            echo "      ✓ Prediction: $CLASS (confidence: $CONF)"
        else
            echo "      ✗ Classification failed"
        fi
    done
else
    echo "   ! Test image not found, skipping classification test"
fi

echo ""
echo "================================"
echo "All tests completed!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Use the model dropdown to switch between models"
echo "3. Upload an image to test classification"
echo "4. Visit http://localhost:3000/stats to view model statistics"
