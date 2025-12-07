import os
from django.conf import settings

try:
    from ultralytics import YOLO
    ULTRALYTICS_AVAILABLE = True
except ImportError:
    ULTRALYTICS_AVAILABLE = False
    try:
        import torch
        TORCH_AVAILABLE = True
    except ImportError:
        TORCH_AVAILABLE = False


class YOLOModel:
    _instance = None
    _model = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(YOLOModel, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._model is None:
            model_path = settings.YOLO_MODEL_PATH
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"YOLO model not found at {model_path}")
            
            if ULTRALYTICS_AVAILABLE:
                self._model = YOLO(model_path)
                self._use_ultralytics = True
            elif TORCH_AVAILABLE:
                import torch
                try:
                    # Try loading with weights_only=False for ultralytics models
                    self._model = torch.load(model_path, map_location='cpu', weights_only=False)
                    self._use_ultralytics = False
                except Exception as e:
                    raise RuntimeError(
                        f"Failed to load model. This appears to be a YOLO model trained with ultralytics. "
                        f"Please install ultralytics: pip install ultralytics\n"
                        f"Original error: {str(e)}"
                    )
            else:
                raise ImportError("Neither ultralytics nor torch is installed. Please install one of them.")
    
    def predict(self, image_path):
        if self._use_ultralytics:
            return self._predict_ultralytics(image_path)
        else:
            return self._predict_torch(image_path)
    
    def _predict_ultralytics(self, image_path):
        results = self._model(image_path)
        predictions = []
        
        for result in results:
            # Check if this is a classification model
            if hasattr(result, 'probs') and result.probs is not None:
                # Classification model
                probs = result.probs
                top5_indices = probs.top5
                top5_conf = probs.top5conf
                
                for idx, conf in zip(top5_indices, top5_conf):
                    class_id = int(idx)
                    confidence = float(conf)
                    class_name = result.names[class_id]
                    
                    predictions.append({
                        'class_id': class_id,
                        'class_name': class_name,
                        'confidence': confidence
                    })
            # Check if this is a detection model
            elif hasattr(result, 'boxes') and result.boxes is not None:
                # Object detection model
                boxes = result.boxes
                for box in boxes:
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    class_name = result.names[class_id]
                    
                    predictions.append({
                        'class_id': class_id,
                        'class_name': class_name,
                        'confidence': confidence
                    })
        
        return predictions
    
    def _predict_torch(self, image_path):
        import torch
        from PIL import Image
        import numpy as np
        
        predictions = []
        
        try:
            img = Image.open(image_path).convert('RGB')
            
            # Check if model has ultralytics structure
            if hasattr(self._model, 'names'):
                # This is a YOLO model loaded with torch
                # Extract class names
                class_names = self._model.names
                
                # Try to run inference
                with torch.no_grad():
                    if hasattr(self._model, 'predict'):
                        results = self._model.predict(img)
                    else:
                        # Model loaded but needs ultralytics to run
                        raise RuntimeError(
                            "This model requires ultralytics for inference. "
                            "Install with: pip install ultralytics"
                        )
                
                # Parse results if available
                if results:
                    for result in results:
                        if hasattr(result, 'boxes'):
                            for box in result.boxes:
                                predictions.append({
                                    'class_id': int(box.cls[0]),
                                    'class_name': class_names[int(box.cls[0])],
                                    'confidence': float(box.conf[0])
                                })
            else:
                # Generic PyTorch model
                raise RuntimeError(
                    "Could not determine model type. "
                    "This appears to be a YOLO model - please install ultralytics: pip install ultralytics"
                )
            
            return predictions
            
        except Exception as e:
            raise RuntimeError(f"Error during inference: {str(e)}")


def get_yolo_model():
    return YOLOModel()
