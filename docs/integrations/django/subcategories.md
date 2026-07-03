# Django Subcategories

Use `subcategories` when a parent Django admin should show child records in detail tabs.

```python
from brilliance_admin import django


class SessionAdmin(django.DjangoAdmin):
    model = UserSession


class UserAdmin(django.DjangoAdmin):
    model = User
    subcategories = [
        SessionAdmin(),
    ]
```

How to add:

1. Create child `DjangoAdmin`.
2. Add it to parent `subcategories = [...]`.
3. Open parent detail page.

How to use:

- each subcategory is a separate tab
- child admin receives `parent_pk`
- child CRUD works in parent context
- reverse FK to parent is removed from child form schema
