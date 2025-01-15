from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def process_command(request):
    command = request.data.get('command')
    # process the command
    output = f'Processing command: {command}'
    return Response({'output': output})
