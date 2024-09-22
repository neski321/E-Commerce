# products/views.py

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer, ReviewSerializer, DimensionSerializer
from django.http import JsonResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Search by title or other parameters
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
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        product = serializer.save()
        
        # product_url = request.build_absolute_uri(f'/products/{product.id}/')
        
        # Handling reviews if provided
        reviews_data = request.data.get('reviews', [])
        for review_data in reviews_data:
            review_data['product'] = product.id
            review_serializer = ReviewSerializer(data=review_data)
            if review_serializer.is_valid():
                review_serializer.save()
        
        # Handling dimensions if provided
        dimensions_data = request.data.get('dimensions', {})
        if dimensions_data:
            dimensions_data['product'] = product.id
            dimension_serializer = DimensionSerializer(data=dimensions_data)
            if dimension_serializer.is_valid():
                dimension_serializer.save()
        
        return Response({
            'product_url': f'/products/{product.id}/',
            'product': serializer.data
        }, status=status.HTTP_201_CREATED)
    else:
        print("Validation Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def update_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        # Debug: Print the errors in the console
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH'])
def update_product_partial(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    # Use partial=True to allow partial updates
    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
