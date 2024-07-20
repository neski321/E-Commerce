# backend/models.py

from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    rating = models.FloatField(default=0.0)
    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=100, default='N/A')
    sku = models.CharField(max_length=50, default='N/A')
    weight = models.FloatField(default=0.0)
    warranty_information = models.CharField(max_length=255, default='To be determined')
    shipping_information = models.CharField(max_length=255, default='To be determined')
    availability_status = models.CharField(max_length=50, default='In progress')
    return_policy = models.CharField(max_length=255, default='To be determined')
    minimum_order_quantity = models.IntegerField(default=1)
    thumbnail = models.URLField(default='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    
    def __str__(self):
        return self.title
    
class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateTimeField()
    reviewer_name = models.CharField(max_length=100)
    reviewer_email = models.EmailField()

class Dimension(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='dimensions')
    width = models.FloatField()
    height = models.FloatField()
    depth = models.FloatField()