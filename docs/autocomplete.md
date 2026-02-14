# Autocomplete

Autocomplete provides search suggestions for `RelatedField` inputs — in table schemas, filters, and action forms.

## How it works

When a user types in a related field input, the frontend sends an autocomplete request with the field name and search string. The backend calls the `autocomplete` method on the category, which delegates to the field's own `autocomplete` method.

Autocomplete works automatically in three contexts:

- **Table schema** — related fields in the main table
- **Filters** — related fields used as filter inputs
- **Action forms** — related fields inside `@admin_action` form schemas

## AutocompleteData

The autocomplete request contains:

| Parameter | Description |
|-----------|-------------|
| `field_slug` | Field name to autocomplete |
| `search_string` | User's search input |
| `limit` | Maximum number of results |
| `existed_choices` | Already selected values (to include them in results) |
| `is_filter` | `True` if the request comes from a filter field |
| `action_name` | Action name if the request comes from an action form |
| `form_data` | Current form data — all field values at the time of the request |

::: tip
Use `form_data` inside `filter_fn` to filter autocomplete results based on other fields in the form. For example, show only terminals that belong to the selected merchant.
:::

## Custom autocomplete

Override `autocomplete` on `CategoryTable` to implement custom logic:

``` python
from brilliance_admin import schema
from brilliance_admin.schema.table.table_models import AutocompleteData, AutocompleteResult, Record


class MyTable(schema.CategoryTable):
    ...

    async def autocomplete(self, data: AutocompleteData, user, admin_schema) -> AutocompleteResult:
        # your custom search logic
        results = [
            Record(key=1, title='Option 1'),
            Record(key=2, title='Option 2'),
        ]
        return AutocompleteResult(results=results)
```

### Record

Each autocomplete result is a `Record`:

| Parameter | Description |
|-----------|-------------|
| `key` | Value stored when selected (usually primary key) |
| `title` | Display text shown in the dropdown |
