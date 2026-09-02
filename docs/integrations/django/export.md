# Django Export

`DjangoPostgresExportAction` adds CSV export of selected rows.

Enable it with `export_fields`:

```python
from brilliance_admin import django

class PaymentAdmin(django.DjangoPostgresExportAction, django.DjangoAdmin):
    export_fields = ['id', 'amount', 'currency__title', 'created_at']
    ...
```

The export action lets a user choose fields from this list.

## Requirements

Export uses PostgreSQL `COPY`.

`ADMIN_SCHEMA_PATH` is required in Django settings with module path `AdminSchema` instance:

```python
ADMIN_SCHEMA_PATH = 'your_project.admin.admin_schema'
```

The Celery task uses it to resolve table configuration.

## Background export

For a background export, the user selects **Async export** and enters an email address.
Register the task in the project's Celery application:

```python
CELERY_IMPORTS = (
    'brilliance_admin.integrations.django.celery',
)
```

The task creates the CSV in the configured Django storage and sends its URL by email.

## Email

The background task uses Django's standard SMTP email backend (`django.core.mail.send_mail`).
Configure it in Django settings:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST', default='smtp.yandex.ru')
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='')
EMAIL_PORT = env.int('EMAIL_PORT', default=587)
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```

For SMTP on port `587`, use `EMAIL_USE_TLS = True`.
