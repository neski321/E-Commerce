from rest_framework import serializers
from .models import Product, Review, Dimension

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = ('width', 'height', 'depth')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    dimensions = DimensionSerializer()

    class Meta:
        model = Product
        fields = '__all__'