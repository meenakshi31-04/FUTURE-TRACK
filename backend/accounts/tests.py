from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class AccountsApiTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test@example.com', email='test@example.com', password='testpass')
        self.client = APIClient()
        # Obtain token via JWT by using simple JWT's token obtain pair view is not present here, but we can force auth
        self.client.force_authenticate(user=self.user)

    def test_profile_get_and_update(self):
        res = self.client.get('/api/profile/')
        self.assertEqual(res.status_code, 200)
        # update
        res = self.client.put('/api/profile/', {'firstName': 'John', 'lastName': 'Doe', 'phone': '12345', 'education': 'High School'}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertIn('firstName', res.data)

    def test_enrollment_create_and_list(self):
        # create a course enrollment
        res = self.client.post('/api/enrollments/create/', {'title': 'Test Course', 'provider': 'Test Provider'}, format='json')
        self.assertIn(res.status_code, (200, 201))
        # list enrollments
        res = self.client.get('/api/enrollments/')
        self.assertEqual(res.status_code, 200)
        self.assertTrue(len(res.data) >= 1)
