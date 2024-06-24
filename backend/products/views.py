# products/views.py

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

def server_status(request):
    return JsonResponse({'status': 'Server is running fine'})