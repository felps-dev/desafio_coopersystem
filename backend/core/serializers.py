from decimal import Decimal
from rest_framework import serializers

from core.models import Order, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(source="product.name", read_only=True)

    def validate_quantity(self, value):
        if('product' in self.initial_data):
            prod = Product.objects.get(pk=self.initial_data['product'])
            field = Decimal(self.initial_data['quantity'])
            if(field < 0):
                raise serializers.ValidationError(
                    'A quantidade deve ser positiva')
            if(field > prod.quantity):
                raise serializers.ValidationError(
                    'A quantidade deve ser menor ou igual ao total do estoque do produto')
            else:
                return value
        else:
            return value

    class Meta:
        model = Order
        fields = '__all__'
