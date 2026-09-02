# DjangoRelatedField

Auto-generated for FK, one-to-one, and many-to-many relations.

It renders autocomplete in the UI.

| Parameter | Description |
|-----------|-------------|
| `rel_name` | Relation attribute on the model |
| `many` | `True` for list relations |
| `dual_list` | Dual-list UI for many relations |
| `filter_fn` | Custom queryset filter |
| `select_related` | FK eager loading for `many=True` serialization |
| `prefetch_related` | Prefetch eager loading for `many=True` serialization |
| `get_queryset` | Custom queryset builder for `many=True` serialization |

Search behavior:

- If target model defines `__search_fields__`, autocomplete searches by them
- Otherwise it searches string/text fields
- If none exist, it falls back to PK

```python
class Currency(models.Model):
    __search_fields__ = ['title', 'char_code']
```

`filter_fn` receives `(queryset, data, user)`.

## Many Relations

For `many=True`, load data used by related record titles:

```python
balances = django.DjangoRelatedField(
    many=True,
    dual_list=True,
    rel_name='balances',
    required=False,
    select_related=['currency'],
    prefetch_related=['tags'],
)
```

For custom loading, pass `get_queryset`.
It can be async and must return Django `QuerySet`:

```python
async def get_balances_queryset(relation, extra):
    return (
        relation.all()
        .select_related('currency')
        .prefetch_related('tags')
        .order_by('id')
    )


balances = django.DjangoRelatedField(
    many=True,
    dual_list=True,
    rel_name='balances',
    required=False,
    get_queryset=get_balances_queryset,
)
```

`relation` is the Django related manager from the parent record.
`extra` contains the current parent `record`, `user`, and `debug`.
If `get_queryset` is set, `select_related` and `prefetch_related` are not applied automatically.
If related record `__str__` reads FK data, load it here.

Single FK fields are loaded by the section queryset:

```python
class PaymentAdmin(django.DjangoAdmin):
    model = Payment

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).select_related('buyer')
```
