from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd

from appbackend.models import Category, SubCategory, Product
from appbackend.serializers import ProductSerializer
from appbackend.utils import ReviewClassifier


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
                                    rating=data['product_rating'], review=data['product_reviews'],
                                    link=data['product_link'])
        return Response({"message": "success"}, status=200)


class AnalyzeFakeReviews(APIView):
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        results = []
        product_title = request.POST.get("keyword")
        if not product_title:
            return Response({'error': 'Keyword parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
        products = Product.objects.filter(sub_category__subcat_title__icontains=product_title)
        classifier = ReviewClassifier(100)

        for product in products:
            review_texts = product.review if isinstance(product.review, list) else [product.review]
            classified_reviews = classifier.classify_reviews(review_texts)
            
            for review_index, is_genuine, predicted_label in classified_reviews:
                results.append({
                    'product_name': product.name,
                    'review': review_texts[review_index - 1],  # Adjusting for 0-based indexing
                    'is_genuine': is_genuine,
                    'confidence': predicted_label,
                    'product_image': product.image,
                    'product_price': product.price,
                    'product_link': product.link,
                })

        return Response({'results': results}, status=status.HTTP_200_OK)
