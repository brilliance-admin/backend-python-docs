# SQLAlchemyRelatedField

Auto-generated for foreign key columns and relationships. Provides an autocomplete search input in the UI.

For `many=False` (foreign key) — single-select autocomplete. For `many=True` (one-to-many, many-to-many) — dual-list selector.

| Parameter | Description |
|-----------|-------------|
| `rel_name` | Relationship attribute name on the model |
| `target_model` | Related SQLAlchemy model class |
| `many` | `True` for list relationships |
| `dual_list` | Enable dual-list UI for many relationships |
| `filter_fn` | Custom async/sync function to modify the autocomplete query |

These fields are generated automatically — you don't need to configure them manually unless you want to customize behavior.

::: tip
Override `__str__` or `__repr__` on your SQLAlchemy models to control how related records appear in autocomplete dropdowns.
``` python
class User(Base):
    __tablename__ = 'users'
    id = sa.Column(sa.Integer, primary_key=True)
    username = sa.Column(sa.String(100))

    def __str__(self):
        return self.username
```
:::

::: tip
Define `__search_fields__` on the related model to enable text search in autocomplete. Without it, autocomplete searches by primary key only.
``` python
class Currency(Base):
    __search_fields__ = ['title', 'char_code']
```
:::

### filter_fn

A function that receives the query statement, autocomplete data, and the current user. Use it to restrict which records appear in the autocomplete dropdown.

Signature: `async def filter_fn(stmt, data, user) -> stmt`

For `data` parameter details, see [AutocompleteData](/autocomplete#autocompletedata).

``` python
from brilliance_admin.auth import UserABC
from brilliance_admin.schema.table.table_models import AutocompleteData
from your_app.models import User

async def users_filter(stmt, data: AutocompleteData, user: UserABC):
    return stmt.where(User.is_active == True)

table_filters = sqlalchemy.SQLAlchemyFieldsSchema(
    model=UserSession,
    extra_kwargs={
        'user_id': {'filter_fn': users_filter},
    },
)
```

## Autocomplete search

By default, autocomplete searches by primary key only. To enable text search across specific columns, define `__search_fields__` on the related model:

``` python
class Currency(Base):
    __tablename__ = 'currency'
    __search_fields__ = ['title', 'char_code']

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(100))
    char_code = sa.Column(sa.String(10))
```

When `__search_fields__` is defined, the autocomplete input will support search operators (see [Search](/integrations/sqlalchemy/table_schema#search)).
