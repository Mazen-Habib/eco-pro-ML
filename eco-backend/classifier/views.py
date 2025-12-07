import os
import tempfile
import base64
from io import BytesIO
from PIL import Image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageUploadSerializer, PredictionSerializer
from .yolo_model import get_yolo_model

try:
    from rembg import remove
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False


class ImageClassificationView(APIView):
    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        image = serializer.validated_data['image']
        
        # Save original image to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            for chunk in image.chunks():
                temp_file.write(chunk)
            temp_path = temp_file.name
        
        foreground_image_base64 = None
        processed_image_path = temp_path
        
        try:
            # Remove background if rembg is available
            if REMBG_AVAILABLE:
                try:
                    # Read the original image
                    with open(temp_path, 'rb') as img_file:
                        input_image = img_file.read()
                    
                    # Remove background
                    output_image = remove(input_image)
                    
                    # Save foreground image
                    foreground_img = Image.open(BytesIO(output_image))
                    
                    # Save processed image to temp file for YOLO
                    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as fg_temp:
                        foreground_img.save(fg_temp, format='PNG')
                        processed_image_path = fg_temp.name
                    
                    # Convert to base64 for frontend
                    buffered = BytesIO()
                    foreground_img.save(buffered, format='PNG')
                    foreground_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                    
                except Exception as e:
                    print(f"Background removal failed: {e}. Using original image.")
            
            # Run YOLO model on processed image
            model = get_yolo_model()
            predictions = model.predict(processed_image_path)
            
            if not predictions:
                return Response({
                    'message': 'No objects detected in the image',
                    'predictions': [],
                    'foreground_image': foreground_image_base64
                }, status=status.HTTP_200_OK)
            
            prediction_serializer = PredictionSerializer(predictions, many=True)
            
            return Response({
                'message': 'Image classified successfully',
                'predictions': prediction_serializer.data,
                'count': len(predictions),
                'foreground_image': foreground_image_base64
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            # Clean up temp files
            if os.path.exists(temp_path):
                os.remove(temp_path)
            if processed_image_path != temp_path and os.path.exists(processed_image_path):
                os.remove(processed_image_path)
