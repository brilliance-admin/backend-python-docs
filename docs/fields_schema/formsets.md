# Formsets

`formset` controls form layout in `FieldsSchema`.

Use it when you need groups, nested sections, titles, descriptions, or column widths.

## Basic usage

```python
from brilliance_admin import schema


class PaymentSchema(schema.FieldsSchema):
    id = schema.IntegerField(label='ID', read_only=True)
    amount = schema.IntegerField(label='Amount')
    endpoint = schema.StringField(label='Endpoint')

    fields = ['id', 'amount', 'endpoint']

    formset = schema.FormSet(
        fields=[
            'id',
            schema.FormSet(
                fields=['amount', 'endpoint'],
                col_span=6,
            ),
        ]
    )
```

## FormSet

`schema.FormSet(...)` is a group node.

Parameters:

| Parameter | Description |
|-----------|-------------|
| `fields` | Required. List of fields or nested `FormSet` items |
| `title` | Group title |
| `description` | Group description |
| `col_span` | Width in the grid |

## FormField

`schema.FormField(...)` configures a single field inside a formset.

Parameters:

| Parameter | Description |
|-----------|-------------|
| `title` | Field slug |
| `col_span` | Width in the grid |

Example:

```python
formset = schema.FormSet(
    fields=[
        schema.FormField('amount', col_span=6),
        schema.FormField('endpoint', col_span=6),
    ]
)
```

## Nested groups

`FormSet` can be nested.

```python
formset = schema.FormSet(
    fields=[
        schema.FormSet(fields=['id', 'status']),
        schema.FormSet(
            title='Extra',
            description='Additional fields',
            fields=['description', 'notes'],
        ),
    ]
)
```

## Validation rules

`FieldsSchema` validates `formset`.

- Every schema field must be present in `formset`.
- `formset` must not reference unknown fields.
- Missing fields raise `...formset is invalid: missing fields`.
- Unknown fields raise `...formset is invalid: fields not found`.

## Notes

- Without `formset`, fields are rendered in default order from `fields`.
- `formset` affects layout only. Field validation still comes from field definitions.
- Inline schemas can also have their own `formset`.

Example in repo:
[payments.py](https://github.com/brilliance-admin/backend-python/tree/main/example/sections/payments.py)
