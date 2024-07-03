# products/views.py

from rest_framework import viewsets, filters
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title','description','category']

    def get_queryset(self):
        return super().get_queryset()

def server_status(request):
    return JsonResponse({'status': 'Server is running fine'})