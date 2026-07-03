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

How to use:

- rows are edited inside parent form
- create/update saves inline rows together with parent
- removed rows are deleted on save
- reverse FK to parent is removed automatically
- nested inline is not supported
