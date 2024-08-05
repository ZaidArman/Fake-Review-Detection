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
        print("product keyword: ", product_title)

        # Build query based on the provided keyword
        if product_title:
            # First, check in product_name
            products = Product.objects.filter(name__icontains=product_title)
            if not products.exists():
                # If not found in product_name, check in sub_category
                products = Product.objects.filter(sub_category__subcat_title__icontains=product_title)
                if not products.exists():
                    # If not found in sub_category, check in category
                    products = Product.objects.filter(sub_category__category__category__icontains=product_title)
        
        if not products.exists():
            # If no products found
            return Response({'message': 'No products found for the given keyword.'}, status=status.HTTP_404_NOT_FOUND)

        # Initialize the classifier
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
            
        # Ensure results list is populated before sorting and slicing
        if results:
            # Sort reviews by confidence in descending order
            results.sort(key=lambda x: x['confidence'], reverse=True)
            top_ten = results[:10]
        else:
            top_ten = []

        return Response({'top_ten': top_ten}, status=status.HTTP_200_OK)
