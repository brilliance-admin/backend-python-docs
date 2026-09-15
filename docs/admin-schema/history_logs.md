# History Logs

Brilliance Admin supports history change providers. A provider saves events created by table operations.

## Provider Interface

```python
from brilliance_admin.schema.table.history_change_provider import HistoryLogsProvider


class HistoryProvider(HistoryLogsProvider):
    async def save_retrieve(self, *, user, pk, data, **kwargs):
        ...

    async def save_create(self, *, user, pk, data, **kwargs):
        ...

    async def save_update(self, *, user, pk, before, data, **kwargs):
        ...

    async def save_admin_action(self, *, user, action_slug, action_data, **kwargs):
        ...
```

## Configure a Provider

Assign a provider class to `AdminSchema`:

```python
admin_schema = schema.AdminSchema(
    # ...
    history_change_provider=HistoryProvider,
)
```

Set `history_change_provider=None` to disable history logging.

## Default Provider

`HistoryChangeDefaultLogs` is enabled by default. It writes history events to the standard logger.
