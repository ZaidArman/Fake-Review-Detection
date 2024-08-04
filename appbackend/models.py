from django.db import models


# Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.category


class SubCategory(models.Model):
    subcat_title = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcat_title


class Product(models.Model):
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    image = models.URLField()
    rating = models.PositiveIntegerField(max_length=100)
    link = models.URLField()

    def __str__(self):
        return self.name

