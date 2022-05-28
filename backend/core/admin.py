from django.contrib import admin

from core.models import Order, Product

# Register your models here.

admin.site.register(Product)
admin.site.register(Order)
