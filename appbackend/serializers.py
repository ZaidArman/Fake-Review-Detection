from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ProductSerializer, self).to_representation(instance)
        data['category'] = instance.sub_category.category.category
        data['sub_category'] = instance.sub_category.subcat_title
        return data
