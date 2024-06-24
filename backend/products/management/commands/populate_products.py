# products/management/commands/populate_products.py
import requests
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    help = 'Populate the database with products from the dummy JSON URL'

    def handle(self, *args, **kwargs):
        url = 'https://dummyjson.com/products?limit=0'
        response = requests.get(url)
        data = response.json()

        products = data.get('products', [])

        for item in products:
            product, created = Product.objects.update_or_create(
                title=item['title'],
                category=item['category'],
                defaults={
                    'price': item['price'],
                    'thumbnail': item['thumbnail'],
                    'description': item['description'],
                    'availabilityStatus': item['availabilityStatus'],
                    'images': item['images'],
                    'discount_percentage': item['discountPercentage'],
                    'warranty_information': item['warrantyInformation'],
                }
            )
            if created:
                print(f"Created product: {product.title}")
            else:
                print(f"Updated product: {product.title}")
