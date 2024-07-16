# views.py
from rest_framework.response import Response
from rest_framework.views import APIView
from.models import Item

items = {}  # in-memory data store

class ItemListView(APIView):
    def get(self, request):
        return Response([{'id': id, 'name': item.name, 'description': item.description} for id, item in items.items()])

    def post(self, request):
        item = Item(name=request.data['name'], description=request.data['description'])
        items[item.id] = item
        return Response({'id': item.id, 'name': item.name, 'description': item.description})

class ItemDetailView(APIView):
    def get(self, request, pk):
        item = items.get(pk)
        if item:
            return Response({'id': item.id, 'name': item.name, 'description': item.description})
        return Response(status=404)

    def delete(self, request, pk):
        if pk in items:
            del items[pk]
            return Response(status=204)
        return Response(status=404)