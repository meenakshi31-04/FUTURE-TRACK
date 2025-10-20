from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class SignupSerializer(serializers.Serializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField(allow_blank=True)
    education = serializers.CharField(allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('firstName',''),
            last_name=validated_data.get('lastName','')
        )
        Profile.objects.create(
            user=user,
            phone=validated_data.get('phone',''),
            education=validated_data.get('education','')
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='user.first_name', required=False)
    lastName = serializers.CharField(source='user.last_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    avatar = serializers.ImageField(required=False, allow_null=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)
    time_spent_today = serializers.IntegerField(required=False)
    goal = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Profile
        fields = ['firstName', 'lastName', 'email', 'phone', 'education', 'avatar', 'avatar_url', 'time_spent_today', 'goal']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if 'first_name' in user_data:
            instance.user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            instance.user.last_name = user_data['last_name']
        if 'email' in user_data:
            instance.user.email = user_data['email']
            instance.user.username = user_data['email']
        instance.user.save()
        instance.phone = validated_data.get('phone', instance.phone)
        instance.education = validated_data.get('education', instance.education)
        if 'avatar' in validated_data:
            instance.avatar = validated_data.get('avatar')
        instance.time_spent_today = validated_data.get('time_spent_today', instance.time_spent_today)
        instance.goal = validated_data.get('goal', instance.goal)
        instance.save()
        return instance

    def get_avatar_url(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'url'):
            request = self.context.get('request')
            if request:
                url = request.build_absolute_uri(obj.avatar.url)
                print(f"Avatar URL (with request): {url}")  # Debug print
                return url
            url = f'/media/avatars/{obj.avatar.name.split("/")[-1]}'
            print(f"Avatar URL (without request): {url}")  # Debug print
            return url
        print("No avatar found")  # Debug print
        return None


from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'provider', 'description']


class EnrollmentSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='course.title', read_only=True)
    provider = serializers.CharField(source='course.provider', read_only=True)
    progress = serializers.IntegerField(required=False)

    class Meta:
        model = Enrollment
        fields = ['id', 'title', 'provider', 'status', 'enrolled_on', 'progress']
