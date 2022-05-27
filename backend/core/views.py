from rest_framework import viewsets
from core.models import Order, Product
from core.serializers import ProductSerializer, OrderSerializer

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ('name', 'un_price', 'quantity', 'status')


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filterset_fields = ('product', 'quantity', 'un_price', 'date',
                        'requester', 'postal_code', 'uf', 'city',
                        'district', 'address', 'number', 'dispatcher',
                        'status')
