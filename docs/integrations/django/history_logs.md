# Django Logs Provider

<div class="img-preview">
  <img src="/history-logs.png" />
</div>

`DjangoLogsProvider` saves table history events to the Django database.

Add `DjangoLogsAdmin` to `AdminSchema.categories` to view history records:

```python
admin_schema = schema.AdminSchema(
    history_change_provider=django.DjangoLogsProvider(),
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

Apply its migrations before starting the admin panel:

```shell
python manage.py migrate brilliance_admin_history_changes
```

Categories whose changes are logged must belong to a `CategoryGroup`: the provider uses the group slug to build the category path.
