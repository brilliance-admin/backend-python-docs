# Django Logs Provider

`DjangoLogsProvider` saves table history events to the Django database.

Add `DjangoLogsAdmin` to `AdminSchema.categories` to view history records:

```python
admin_schema = schema.AdminSchema(
    categories=[
        # ...
        schema.CategoryGroup(
            slug='system',
            title='System',
            subcategories=[
                django.DjangoLogsAdmin(),
            ],
        ),
    ],
    # ...
)
```

Add the application to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    'brilliance_admin.integrations.django.history_changes',
]
```
