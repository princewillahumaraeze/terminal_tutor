from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LessonViewSet, process_command

router = DefaultRouter()
router.register(r'lessons', LessonViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process_command/', process_command, name='process_command')
]
