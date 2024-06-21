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
            product, created = Product.objects.get_or_create(
                title=item['title'],
                category=item['category'],
                defaults={
                    'price': item['price'],
                    'thumbnail': item['thumbnail'],
                    'description': item['description'],
                    'stock': item['stock'],
                    'brand': item['brand'],
                    'images': item['images'],
                    'discountPercentage': item['discountPercentage'],
                    'warrantyInformation': item['warrantyInformation'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully added product {product.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'Product {product.title} already exists'))
