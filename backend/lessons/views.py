from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lesson, Task
from .serializers import LessonSerializer, TaskSerializer
import subprocess


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    lookup_field = 'slug'


@api_view(['POST'])
def process_command(request):
    command = request.data.get('command', '')
    try:
        # CAUTION: This is for demonstration purposes only.
        # In a real-world scenario, you should use a sandboxed environment
        # or a more secure method to execute commands.
        output = subprocess.check_output(command, shell=True, text=True, stderr=subprocess.STDOUT)
        return Response({'output': output})
    except subprocess.CalledProcessError as e:
        return Response({'output': str(e)}, status=400)
