from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/ckeditor/', include('ckeditor_uploader.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/v1/', include('api.urls')),
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    urlpatterns += doc_urls