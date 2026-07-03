# SQLAlchemy Subcategories

Use `subcategories` when a parent SQLAlchemy admin should show child records in detail tabs.

<div class="img-preview">
  <img src="/subcategory.png" />
</div>

```python
from brilliance_admin import sqlalchemy


class TerminalAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = Terminal
    db_async_session = db.async_session


class MerchantAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = Merchant
    db_async_session = db.async_session
    subcategories = [
        TerminalAdmin(),
    ]
```

How to add:

1. Create a child `SQLAlchemyAdmin`.
2. Add it to parent `subcategories = [...]`.
3. Open the parent detail page.

How to use:

- Each subcategory is shown as a separate tab.
- The child admin receives `parent_pk`.
- Child list/create/retrieve/update work in parent context.
- The reverse FK to the parent is removed from the child form schema.
