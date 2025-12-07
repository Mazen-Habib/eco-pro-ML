from rest_framework import serializers


class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)
    
    def validate_image(self, value):
        max_size = 10 * 1024 * 1024  # 10MB
        if value.size > max_size:
            raise serializers.ValidationError("Image size cannot exceed 10MB")
        return value


class PredictionSerializer(serializers.Serializer):
    class_name = serializers.CharField()
    confidence = serializers.FloatField()
    class_id = serializers.IntegerField()
