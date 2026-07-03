# Django Fields

`django.DjangoFieldsSchema` auto-generates fields from a Django model.

Use it as `table_schema` or `table_filters` in [DjangoAdmin](/integrations/django/table_schema).

```python
from brilliance_admin import django


class UserSchema(django.DjangoFieldsSchema):
    model = User
```

| Parameter | Description |
|-----------|-------------|
| `model` <Badge type="danger" text="required" /> | Django model |

Auto-generated:

- PK -> `IntegerField`
- `CharField`/`TextField` -> `StringField`
- `DecimalField`/`FloatField` -> decimal field
- `BooleanField` -> `BooleanField`
- `DateTimeField`/`DateField`/`TimeField` -> `DateTimeField`
- `JSONField` -> `JSONField`
- `ImageField` -> `ImageField`
- `FileField` -> `FileField`
- FK / O2O / M2M -> `DjangoRelatedField`

Notes:

- `choices` become `ChoiceField`
- `readonly_fields`, `extra_kwargs`, `formset` work here too
- plain `InlineField` is not supported, use [DjangoInlineField](/integrations/django/inline_field)
