# Django Logs Provider

`DjangoLogsProvider` saves table history events to the Django database.

## Installation

Add the application to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    'brilliance_admin.integrations.django.history_changes',
]
```

Apply migrations:

```shell
python manage.py migrate
```

## Configuration

Assign the provider to a Django table category:

```python
from brilliance_admin import django


class UsersAdmin(django.DjangoAdmin):
    history_change_provider = django.DjangoLogsProvider
```

The application stores events in the `HistoryChange` model.
