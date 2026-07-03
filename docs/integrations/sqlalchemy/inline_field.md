# SQLAlchemyInlineField

Use `sqlalchemy.SQLAlchemyInlineField` to edit child rows inside the parent form.

<div class="img-preview">
  <img src="/inline.png" />
</div>

```python
from brilliance_admin import sqlalchemy


class FeeFieldsSchema(sqlalchemy.SQLAlchemyFieldsSchema):
    model = Fee


class TerminalFieldsSchema(sqlalchemy.SQLAlchemyFieldsSchema):
    model = Terminal

    fees = sqlalchemy.SQLAlchemyInlineField(
        label='Fees',
        many=True,
        table_schema=FeeFieldsSchema(),
    )
```

How to add:

1. Create a child `SQLAlchemyFieldsSchema`.
2. Add `SQLAlchemyInlineField(..., many=True, table_schema=ChildSchema())` to the parent schema.
3. Use the parent schema as `table_schema` in your admin.

How to use:

- Inline rows are shown inside the parent create/update form.
- New rows are created together with the parent update/create request.
- Existing rows are updated by primary key.
- Removed rows are deleted on save.
- Nested inline is not supported.

Example in repo:
[terminal.py](/home/honnisha/Projects/brilliance-admin/backend-python/example/sections/terminal.py:24)
