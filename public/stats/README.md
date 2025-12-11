# Model Statistics Images

This directory contains performance statistics images for each YOLO model.

## Directory Structure

Each model has its own subdirectory containing the following images:

- `confusion_matrix.png` - Confusion matrix showing classification performance
- `confusion_matrix_normalized.png` - Normalized confusion matrix
- `metrics_comparison.png` - Comparison of precision, recall, and F1-score
- `precision_plot.png` - Precision scores per class
- `recall_plot.png` - Recall scores per class
- `f1_score_plot.png` - F1 scores per class
- `specificity_plot.png` - Specificity scores per class

## Models

### yolov11m-3class
YOLOv11 Medium model trained on 3 waste classes

### yolov11n-12class
YOLOv11 Nano model trained on 12 waste classes

### yolov8n-3class
YOLOv8 Nano model trained on 3 waste classes

## Usage

Place your generated statistics images in the respective model directory. The frontend will automatically load the correct images based on the selected model.
