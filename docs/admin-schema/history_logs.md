# History Logs

Brilliance Admin supports history change providers. A provider saves events created by table operations.

## Provider Interface

```python
from brilliance_admin.schema.table.history_change_provider import HistoryLogsProvider


class HistoryProvider(HistoryLogsProvider):
    async def save_create(
        self,
        *,
        category,
        parent_category,
        user,
        pk,
        data,
        **kwargs,
    ):
        ...

    async def save_update(
        self,
        *,
        category,
        parent_category,
        user,
        pk,
        before,
        data,
        language_context,
        **kwargs,
    ):
        ...

    async def save_admin_action(
        self,
        *,
        category,
        parent_category,
        user,
        action_slug,
        action_data,
        **kwargs,
    ):
        ...
```

## Configure a Provider

Assign a provider instance to `AdminSchema`:

```python
admin_schema = schema.AdminSchema(
    # ...
    history_change_provider=HistoryProvider(),
)
```

Set `history_change_provider=None` to disable history logging.

## Default Provider

`HistoryChangeDefaultLogs` is enabled by default. It writes history events to the standard logger.
