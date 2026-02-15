from django.urls import path
from .views import RegisterView, LoginView, LeaderboardView, SubmitScoreView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('score/', SubmitScoreView.as_view(), name='submit-score'),
]
