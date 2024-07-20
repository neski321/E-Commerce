# products/views.py

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            search_type = self.request.query_params.get('type', 'regular')
            if search_type == 'regular':
                queryset = queryset.filter(Q(title__icontains=search_query))
            elif search_type == 'advanced':
                queryset = queryset.filter(
                    Q(title__icontains=search_query) |
                    Q(description__icontains=search_query) |
                    Q(category__icontains=search_query) |
                    Q(price__icontains=search_query)
                )
        return queryset

def server_status(request):
    return JsonResponse({'status': 'Server is running fine'})

@api_view(['GET'])
def restricted_view(request):
    if request.user_role != 'admin':
        return Response({'error': 'Forbidden'}, status=403)
    return Response({'message': 'Welcome, admin!'})

@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)