# Permissions

<div class="img-preview">
  <img src="/permissions.png" />
</div>

Django integration provides storage and editing for personal permissions and permission groups.

## Installation

Add the application to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...,
    'brilliance_admin.integrations.django.permissions',
]
```

Apply migrations for this application:

```shell
python manage.py migrate brilliance_admin_permissions
```

The models use `settings.AUTH_USER_MODEL`.

## Configuration

Pass `DjangoPermissionsManager` to `AdminSchema`:

```python
from brilliance_admin.integrations.django.permissions.manager import (
    DjangoPermissionsManager,
)

admin_schema = AdminSchema(
    ...,
    categories=categories,
    permissions_manager=DjangoPermissionsManager(),
)
```

## Editing personal permissions

Use `DjangoPermissionsFieldsSchema` and add `PermissionsSettingsInlineField` to the user category:

```python
from django.contrib.auth import get_user_model

from brilliance_admin import django, schema, permissions

User = get_user_model()


class UserAdmin(django.DjangoAdmin):
    model = User

    table_schema = django.DjangoPermissionsFieldsSchema(
        model=User,
        fields=['id', 'username', 'permissions_settings'],
        permissions_settings=permissions.PermissionsSettingsInlineField(),

        # Optional: if using a formset, remember to include permissions_settings.
        formset=schema.FormSet(fields=['id', 'username', 'permissions_settings']),
    )
```

The form displays `is_superuser` and all available rules. The manager loads and saves the settings.

## Editing groups

Add a category for `PermissionsGroup`. The same inline edits group permissions; `users` selects the members.

```python
class PermissionsGroupAdmin(django.DjangoAdmin):
    model = django.permissions.models.PermissionsGroup

    table_schema = django.DjangoPermissionsFieldsSchema(
        model=django.permissions.models.PermissionsGroup,
        fields=['id', 'title', 'users', 'priority', 'permissions_settings'],
        permissions_settings=permissions.PermissionsSettingsInlineField(),

        # Optional: if using a formset, remember to include permissions_settings.
        formset=schema.FormSet(fields=[
            'id', 'title', 'users', 'priority', 'permissions_settings',
        ]),
    )
```

Include both categories in `AdminSchema.categories`.
