# Permissions

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

Pass the same category instances to the manager and `AdminSchema`:

```python
from brilliance_admin.integrations.django.permissions.manager import (
    DjangoPermissionsManager,
)

admin_schema = AdminSchema(
    ...,
    categories=categories,
    permissions_manager=DjangoPermissionsManager(categories),
)
```

## Editing personal permissions

Add `PermissionsSettingsInlineField` to the user category:

```python
from django.contrib.auth import get_user_model

from brilliance_admin.integrations.django import DjangoAdmin, DjangoFieldsSchema
from brilliance_admin.permissions.category import PermissionsSettingsCategory
from brilliance_admin.permissions.inline_field import PermissionsSettingsInlineField
from brilliance_admin.schema.table.fields_schema import FormSet

User = get_user_model()


class UserAdmin(DjangoAdmin):
    permissions_category = PermissionsSettingsCategory()

    table_schema = DjangoFieldsSchema(
        model=User,
        fields=['id', 'username', 'permissions_settings'],
        permissions_settings=PermissionsSettingsInlineField(
            permissions_category,
        ),
        # Optional: if using a formset, remember to include permissions_settings.
        formset=FormSet(fields=['id', 'username', 'permissions_settings']),
    )
```

The form displays `is_superuser` and all available rules. The manager loads and saves the settings.

## Editing groups

Add a category for `PermissionsGroup`. The same inline edits group permissions; `users` selects the members.

```python
from brilliance_admin.integrations.django.permissions.models import PermissionsGroup


class PermissionsGroupAdmin(DjangoAdmin):
    permissions_category = PermissionsSettingsCategory()

    table_schema = DjangoFieldsSchema(
        model=PermissionsGroup,
        fields=['id', 'title', 'users', 'priority', 'permissions_settings'],
        permissions_settings=PermissionsSettingsInlineField(
            permissions_category,
        ),
        # Optional: if using a formset, remember to include permissions_settings.
        formset=FormSet(fields=[
            'id', 'title', 'users', 'priority', 'permissions_settings',
        ]),
    )
```

Include both categories in the `categories` passed to the manager and admin schema.

## How permissions work

`UserPermissionsSettings` stores one settings record per user, created automatically when first loaded. `PermissionsGroup` stores group settings and membership.

Groups are applied in ascending `priority` order. For equal priorities, the group with the greater primary key is applied later. Personal settings are applied last and have the highest priority.

- `INHERIT` keeps the result from the previous level.
- `ALLOW` grants access.
- `DENY` denies access.
- `is_superuser` grants all permissions except those explicitly denied at the same level. Higher-priority settings can override them.

Access is denied unless a level grants it. Only explicit `allow` and `deny` rules are stored; `inherit` is omitted.

Permissions are loaded asynchronously. Subsequent access checks use the loaded data without additional queries. See [Permissions](/permissions) for the common interface.
