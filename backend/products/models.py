# backend/models.py

from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    thumbnail = models.URLField(default='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    description = models.TextField(default='To be determined')
    availabilityStatus = models.CharField(max_length=255, default='In progress')
    images = models.JSONField(default=dict)  # Assuming images is a list of URLs
    discount_percentage = models.FloatField(default=0.0)
    warranty_information = models.TextField(default='To be determined')
    
    def __str__(self):
        return self.title
