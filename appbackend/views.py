from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd

from appbackend.models import Category, SubCategory, Product
from appbackend.serializers import ProductSerializer


class RetrieveDataFromExcell(APIView):

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("file")
        excel_data = pd.read_excel(file)
        data_dict = excel_data.to_dict(orient='records')

        for data in data_dict:
            category, created = Category.objects.get_or_create(category=data['category'])
            sub_category, _ = SubCategory.objects.get_or_create(category=category, subcat_title=data['subcategory'])
            Product.objects.create(sub_category=sub_category, name=data['product_name'],
                                              image=data['product_image'], price=data['product_price'],
                                              rating=data['product_rating'], link=data['product_link'])
        return Response({"message": "success"}, status=200)


class AnalyzeFakeReviews(APIView):
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        product_title = request.POST.get("keyword")
        products = Product.objects.filter(name__icontains=product_title)
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data)
