# SQLAlchemy Logs Provider

`SQLAlchemyLogsProvider` saves table history events to the SQLAlchemy database.

## Provider

```python
from brilliance_admin.integrations.sqlalchemy.history_changes import SQLAlchemyLogsProvider

admin_schema = schema.AdminSchema(
    # ...
    history_change_provider=SQLAlchemyLogsProvider(
        db_async_session=async_sessionmaker_,
    ),
)
```

## Logs category

Add `SQLAlchemyLogsAdmin` to `AdminSchema.categories` to view history records:

```python
from brilliance_admin.integrations.sqlalchemy.history_changes import SQLAlchemyLogsAdmin

admin_schema = schema.AdminSchema(
    categories=[
        # ...
        schema.CategoryGroup(
            slug='system',
            title='System',
            subcategories=[
                SQLAlchemyLogsAdmin(db_async_session=async_sessionmaker_),
            ],
        ),
    ],
)
```

## Migration

Add `HistoryChange` to the SQLAlchemy metadata used by Alembic, then create and apply a migration.
