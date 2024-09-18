from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeView, name='homeViewAccount'),
    path('login', views.loginView, name='loginViewAccount'),
    path('logout', views.logoutView, name='logoutViewAccount'),
    path('users', views.userView, name='userViewAccount'),
    path('users/<int:id>', views.userDetailsView, name='userDetailsViewAccount'),
    path('password-change', views.passwordChangeView, name='passwordChangeViewAccount'),
    path('password-reset', views.passwordResetView, name='passwordResetViewAccount'),
    path('password-reset-done/<str:link>', views.passwordResetDoneView, name='passwordResetDoneViewAccount'),
]