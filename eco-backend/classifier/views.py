import os
import tempfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageUploadSerializer, PredictionSerializer
from .yolo_model import get_yolo_model


class ImageClassificationView(APIView):
    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        image = serializer.validated_data['image']
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            for chunk in image.chunks():
                temp_file.write(chunk)
            temp_path = temp_file.name
        
        try:
            model = get_yolo_model()
            predictions = model.predict(temp_path)
            
            if not predictions:
                return Response({
                    'message': 'No objects detected in the image',
                    'predictions': []
                }, status=status.HTTP_200_OK)
            
            prediction_serializer = PredictionSerializer(predictions, many=True)
            
            return Response({
                'message': 'Image classified successfully',
                'predictions': prediction_serializer.data,
                'count': len(predictions)
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)
