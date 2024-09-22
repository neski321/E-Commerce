from rest_framework import serializers
from .models import Product, Review, Dimension

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'date', 'reviewer_name', 'reviewer_email']

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = ['width', 'height', 'depth']

class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, required=False)
    dimensions = DimensionSerializer(required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update or create nested reviews
        reviews_data = validated_data.pop('reviews', None)
        if reviews_data is not None:
            instance.reviews.all().delete()
            for review_data in reviews_data:
                # Avoid conflicts with the product foreign key
                review_data.pop('product', None)
                Review.objects.create(product=instance, **review_data)

        # Update or create dimensions
        dimensions_data = validated_data.pop('dimensions', None)
        if dimensions_data is not None:
            Dimension.objects.update_or_create(product=instance, defaults=dimensions_data)

        # Update other fields of the product
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance