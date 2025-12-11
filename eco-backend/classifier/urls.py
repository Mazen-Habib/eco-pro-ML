from django.urls import path
from .views import ImageClassificationView, ModelListView

urlpatterns = [
    path('classify/', ImageClassificationView.as_view(), name='classify-image'),
    path('models/', ModelListView.as_view(), name='list-models'),
]
