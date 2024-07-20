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
    reviews = ReviewSerializer(many=True, required=False)
    dimensions = DimensionSerializer(required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update nested reviews
        reviews_data = validated_data.pop('reviews', None)
        if reviews_data is not None:
            instance.reviews.all().delete()
            for review_data in reviews_data:
                Review.objects.create(product=instance, **review_data)

        # Update nested dimensions
        dimensions_data = validated_data.pop('dimensions', None)
        if dimensions_data is not None:
            Dimension.objects.update_or_create(product=instance, defaults=dimensions_data)

        # Update the rest of the fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance