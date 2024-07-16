# urls.py
from django.urls import path
from. import views

urlpatterns = [
    path('api/items/', views.ItemListView.as_view()),
    path('api/items/<int:pk>/', views.ItemDetailView.as_view)
]