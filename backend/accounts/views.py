from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, EnrollmentSerializer
from .models import Profile, Enrollment, Course
from rest_framework.parsers import MultiPartParser, FormParser



class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'email': user.email
                },
                'token': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'email': user.email
                },
                'token': str(refresh.access_token)
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            profile = Profile.objects.create(user=request.user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            profile = Profile.objects.create(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnrollmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(user=request.user)
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)


class EnrollmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get('title') or request.data.get('name')
        provider = request.data.get('provider', '')
        if not title:
            return Response({'detail': 'Course title required'}, status=status.HTTP_400_BAD_REQUEST)
        course, _ = Course.objects.get_or_create(title=title, defaults={'provider': provider})
        enrollment, created = Enrollment.objects.get_or_create(user=request.user, course=course, defaults={'status': 'enrolled'})
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class EnrollmentUpdateView(APIView):
    """Allow the authenticated user to update their enrollment (progress)."""
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            enrollment = Enrollment.objects.get(pk=pk, user=request.user)
        except Enrollment.DoesNotExist:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        progress = request.data.get('progress')
        if progress is None:
            return Response({'detail': 'progress is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            progress_int = int(progress)
        except (ValueError, TypeError):
            return Response({'detail': 'progress must be an integer between 0 and 100'}, status=status.HTTP_400_BAD_REQUEST)

        if progress_int < 0 or progress_int > 100:
            return Response({'detail': 'progress must be between 0 and 100'}, status=status.HTTP_400_BAD_REQUEST)

        enrollment.progress = progress_int
        enrollment.save()
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data)


class DataExportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            profile = None
        enrollments = Enrollment.objects.filter(user=request.user)
        profile_data = ProfileSerializer(profile, context={'request': request}).data if profile else {}
        enrollment_data = EnrollmentSerializer(enrollments, many=True, context={'request': request}).data
        return Response({'profile': profile_data, 'enrollments': enrollment_data})


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user.delete()
        return Response({'detail': 'Account deleted'})
