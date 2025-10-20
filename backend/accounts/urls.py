from django.urls import path
from .views import SignupView, LoginView
from .views import ProfileView, EnrollmentListView
from .views import EnrollmentCreateView
from .views import DataExportView, DeleteAccountView
from .views import EnrollmentUpdateView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('enrollments/', EnrollmentListView.as_view(), name='enrollments'),
    path('enrollments/create/', EnrollmentCreateView.as_view(), name='enrollment-create'),
    path('enrollments/<int:pk>/', EnrollmentUpdateView.as_view(), name='enrollment-update'),
    path('export/', DataExportView.as_view(), name='export-data'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
]
