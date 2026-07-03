# DjangoRelatedField

Auto-generated for FK, one-to-one, and many-to-many relations.

It renders autocomplete in the UI.

| Parameter | Description |
|-----------|-------------|
| `rel_name` | Relation attribute on the model |
| `many` | `True` for list relations |
| `dual_list` | Dual-list UI for many relations |
| `filter_fn` | Custom queryset filter |

Search behavior:

- If target model defines `__search_fields__`, autocomplete searches by them
- Otherwise it searches string/text fields
- If none exist, it falls back to PK

```python
class Currency(models.Model):
    __search_fields__ = ['title', 'char_code']
```

`filter_fn` receives `(queryset, data, user)`.
