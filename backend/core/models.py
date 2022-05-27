from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver

# Create your models here.


class User(AbstractUser):
    pass

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Product Name/Description')
    un_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Unitary Price')
    quantity = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Stock Available Quantity')
    status = models.PositiveSmallIntegerField(verbose_name='Product Status', choices=[(0, 'Unavailable'), (1, 'Available')], default=0)


@receiver(models.signals.pre_save, sender=Product)
def product_pre_save(sender, instance, **kwargs):
    if(instance.quantity <= 0):
        instance.status = 0
    else:
        instance.status = 1

class Order(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.PROTECT, related_name='orders', verbose_name='Product')
    quantity = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Quantity of product')
    un_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Unitary Price of product')
    date = models.DateTimeField(verbose_name='Date and Time of order', auto_now_add=True)
    requester = models.CharField(verbose_name='Requester of order', max_length=255)
    postal_code = models.CharField(
        max_length=8, verbose_name='Postal Code / CEP')
    uf = models.CharField(max_length=2, verbose_name='UF',
                          help_text='Federal Unity')
    city = models.CharField(
        max_length=60, verbose_name='city')
    district = models.CharField(
        max_length=60, verbose_name='District')
    address = models.CharField(
        max_length=300, verbose_name='Address', help_text='First address line')
    number = models.CharField(
        max_length=10, verbose_name='Number')
    dispatcher = models.CharField(verbose_name='Dispatcher of order', max_length=255)
    status = models.PositiveSmallIntegerField(verbose_name='Order Status', choices=[(0, 'Pending'), (1, 'Sent'), (2, 'Delivered')], default=0)

@receiver(models.signals.post_save, sender=Order)
def order_post_save(sender, instance, **kwargs):
    # Decrase stock quantity after creating order
    instance.product.quantity -= instance.quantity
    instance.product.save()

@receiver(models.signals.post_delete, sender=Order)
def order_post_delete(sender, instance, **kwargs):
    # Inscrase stock quantity after deleting order
    instance.product.quantity += instance.quantity
    instance.product.save()
