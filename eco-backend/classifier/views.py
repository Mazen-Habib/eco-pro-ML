import os
import tempfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .serializers import ImageUploadSerializer, PredictionSerializer
from .yolo_model import get_yolo_model


class ImageClassificationView(APIView):
    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        image = serializer.validated_data['image']
        model_key = request.data.get('model', settings.DEFAULT_MODEL)
        
        # Validate model key
        if model_key not in settings.YOLO_MODELS:
            return Response({
                'error': f'Invalid model key. Available models: {list(settings.YOLO_MODELS.keys())}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Save image to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            for chunk in image.chunks():
                temp_file.write(chunk)
            temp_path = temp_file.name
        
        try:
            # Run YOLO model
            model = get_yolo_model(model_key)
            predictions = model.predict(temp_path)
            
            if not predictions:
                return Response({
                    'message': 'No objects detected in the image',
                    'predictions': [],
                    'model': model_key
                }, status=status.HTTP_200_OK)
            
            prediction_serializer = PredictionSerializer(predictions, many=True)
            
            return Response({
                'message': 'Image classified successfully',
                'predictions': prediction_serializer.data,
                'count': len(predictions),
                'model': model_key
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)


class ModelListView(APIView):
    def get(self, request):
        models = []
        for key, config in settings.YOLO_MODELS.items():
            models.append({
                'key': key,
                'name': config['name'],
                'classes': config['classes']
            })
        return Response({
            'models': models,
            'default': settings.DEFAULT_MODEL
        }, status=status.HTTP_200_OK)
