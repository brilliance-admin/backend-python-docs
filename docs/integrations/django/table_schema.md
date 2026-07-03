# Django Table

`django.DjangoAdmin` is the built-in Django ORM table integration.

It auto-implements list, retrieve, create, update, delete, filters, and autocomplete.

```python
from brilliance_admin import schema, django


class UserAdmin(django.DjangoAdmin):
    model = User

    slug = 'users'
    title = 'Users'
    icon = 'mdi-account'

    search_fields = ['username', 'email']
    ordering_fields = ['id', 'created_at']

    table_schema = django.DjangoFieldsSchema(model=User)
    table_filters = django.DjangoFieldsSchema(
        model=User,
        created_at=schema.DateTimeField(range=True),
    )
```

| Parameter | Description |
|-----------|-------------|
| `model` <Badge type="danger" text="required" /> | Django model |
| `search_fields` | List of lookup paths for search |
| `ordering_fields` | List of sortable model fields |

Defaults:

- `slug` = lowercased model name
- `pk_name` = model primary key name
- `default_ordering` = `-{pk_name}`
- `table_schema` = auto-generated `DjangoFieldsSchema(model=...)`

Notes:

- `search_fields` support lookup paths like `user__username`
- `table_filters` uses `DjangoFieldsSchema`
- parent subcategories filter by `parent_pk` automatically
