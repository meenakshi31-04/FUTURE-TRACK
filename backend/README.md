This minimal Django backend provides two API endpoints used by the React frontend in the project root:

- POST /api/signup/  -> create a new user (first_name, last_name, email, phone, education, password)
- POST /api/login/   -> obtain an auth token (email, password)

Quick start (Windows PowerShell):

1. Create a venv and activate it:

   python -m venv .venv; .\.venv\Scripts\Activate.ps1

2. Install dependencies:

   pip install -r requirements.txt

3. Run migrations and start server:

   python manage.py migrate; python manage.py runserver

4. The API will be at http://127.0.0.1:8000/api/

Notes:
- This is a minimal, development-only setup (SQLite). For production, configure SECRET_KEY, DEBUG, allowed hosts, HTTPS, and a real DB.

Frontend integration:

- The React app modals POST to:
   - POST http://127.0.0.1:8000/api/signup/  (JSON body: firstName,lastName,lastName,email,phone,education,password)
   - POST http://127.0.0.1:8000/api/login/   (JSON body: email,password)

Responses return a JSON with `user` and `token` (JWT access token). The frontend stores token in localStorage under `ft_token` by default.

Additional endpoints for the new Dashboard feature:

- GET/PUT http://127.0.0.1:8000/api/profile/  (authenticated) - fetch and update the user's profile (firstName,lastName,phone,education)
- GET http://127.0.0.1:8000/api/enrollments/   (authenticated) - list courses the user is enrolled in

After pulling these changes you must create and run migrations to add new models (Course, Enrollment) to the database:

Windows PowerShell commands:

```powershell
python manage.py makemigrations accounts; python manage.py migrate
```

You can create courses via the Django admin (http://127.0.0.1:8000/admin/) and enroll users programmatically or via admin.
