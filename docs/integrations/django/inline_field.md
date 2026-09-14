# DjangoInlineField

Use `django.DjangoInlineField` to edit child rows inside the parent form.

```python
from brilliance_admin import django


class ChildSchema(django.DjangoFieldsSchema):
    model = Child


class ParentSchema(django.DjangoFieldsSchema):
    model = Parent

    children = django.DjangoInlineField(
        label='Children',
        many=True,
        table_schema=ChildSchema(),
    )
```

How to add:

1. Create child `DjangoFieldsSchema`.
2. Add `DjangoInlineField(..., table_schema=ChildSchema())`.
3. Use parent schema in `DjangoAdmin`.

| Parameter | Description |
|-----------|-------------|
| `many` | Must be `True` for reverse relation rows |
| `table_schema` | Child `DjangoFieldsSchema` |
| `select_related` | FK eager loading for child rows |
| `prefetch_related` | Prefetch eager loading for child rows |
| `get_queryset` | Custom child queryset builder |
| `get_data` | Custom child data loader from the parent record |
| `table_view` | Render read-only rows as a table |

## Queryset

`DjangoInlineField` loads child rows from the parent relation.

Use `select_related` and `prefetch_related` to eager-load fields:

```python
children = django.DjangoInlineField(
    many=True,
    table_schema=ChildSchema(),
    select_related=['target', 'target__bank'],
    prefetch_related=['tags'],
)
```

For custom loading, pass `get_queryset`.
It can be async and must return Django `QuerySet`:

```python
async def get_children_queryset(relation, extra):
    return (
        relation.all()
        .select_related('target')
        .prefetch_related('tags')
        .order_by('id')
    )


children = django.DjangoInlineField(
    many=True,
    table_schema=ChildSchema(),
    get_queryset=get_children_queryset,
)
```

`relation` is the Django related manager from the parent record.
`extra` contains the current parent `record`, `user`, and `debug`.
If `get_queryset` is set, `select_related` and `prefetch_related` are not applied automatically.
If an inline row `__str__` or related field reads FK data, load it here.

## Table view

For a compact read-only representation, add `table_view=True`:

```python
children = django.DjangoInlineField(
    many=True,
    read_only=True,
    table_view=True,
    table_schema=ChildSchema(),
)
```

## Custom data

Use `get_data` when rows are not available directly from a relation on the parent.
The callback receives the parent record and `extra`; it may be `def` or `async def`.
It must return a Django `QuerySet`, related manager, or list.

```python
async def get_children(parent, extra):
    source = await parent.sources.aget()
    return source.children.all()


children = django.DjangoInlineField(
    many=True,
    read_only=True,
    table_schema=ChildSchema(),
    get_data=get_children,
)
```

How to use:

- rows are edited inside parent form
- create/update saves inline rows together with parent
- removed rows are deleted on save
- reverse FK to parent is removed automatically
- nested inline is not supported
