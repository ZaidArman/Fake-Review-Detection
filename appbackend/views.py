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






## ML Model view.py work # Zaid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .utils import ReviewClassifier

# Initialize the classifier # Change the file paths
model_path = '/Users/apple/Downloads/backend/ML_Model/reviews_classification_model.h5'
tokenizer_path = '/Users/apple/Downloads/backend/ML_Model/tokenizers.pkl'
max_len = 100 # don't change it
classifier = ReviewClassifier(model_path, tokenizer_path, max_len)

class ReviewClassificationView(APIView):
    def get(self, request, *args, **kwargs):
        keyword = request.GET.get('keyword')
        if not keyword:
            return Response({'error': 'Keyword parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)

        products = Product.objects.filter(name__icontains=keyword)

        results = []
        for product in products:
            is_genuine, confidence = classifier.classify_review(product.review)
            results.append({
                'product_name': product.name,
                'review': product.review,
                'is_genuine': is_genuine,
                'confidence': confidence
            })

        return Response({'results': results}, status=status.HTTP_200_OK)
