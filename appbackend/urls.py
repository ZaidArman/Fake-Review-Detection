from django.urls import path

from . import views

urlpatterns = [
    path('analyze/', views.AnalyzeFakeReviews.as_view(), name='analyze'),
    path('excel/', views.RetrieveDataFromExcell.as_view(), name='excel'),
]