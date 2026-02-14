# SQLAlchemy Fields

`SQLAlchemyFieldsSchema` auto-generates fields from a SQLAlchemy model. Use it as `table_schema` or `table_filters` in [SQLAlchemyAdmin](/integrations/sqlalchemy/tables).

## SQLAlchemyFieldsSchema

Replacement for [FieldsSchema](/fields_schema/fields_schema) that reads column types from the model and creates matching fields automatically.

| Parameter | Description |
|-----------|-------------|
| `model` <Badge type="danger" text="required" /> | SQLAlchemy model class |

## Auto-generated schema

If no `fields` list is set, all columns and relationships from the model will be included.
``` python
table_schema = sqlalchemy.SQLAlchemyFieldsSchema(model=User)
```

## Type mapping

| SQLAlchemy type | Field |
|-----------------|-------|
| `Integer`, `BigInteger` | `IntegerField` |
| `String` | `StringField` (with `max_length` from column length) |
| `Boolean` | `BooleanField` |
| `DateTime` | `DateTimeField` |
| `Numeric` | `IntegerField` (with `precision` and `scale`) |
| `JSON` | `JSONField` |
| `ARRAY` | `ArrayField` |
| Foreign key | `SQLAlchemyRelatedField` |
| Relationship | `SQLAlchemyRelatedField` |

## Column info

Use the `info` dict on SQLAlchemy columns to set field metadata:

``` python
import sqlalchemy as sa


class User(Base):
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    username = sa.Column(sa.String(100), info={'label': 'Username'})
    role = sa.Column(sa.String(20), info={
        'label': 'Role',
        'choices': RoleEnum,
    })
```

| `info` key | Description |
|------------|-------------|
| `label` | Display name for the field |
| `help_text` | Tooltip text |
| `choices` | Enum class — renders as `ChoiceField` |

## Auto-generated schema

Pass only the model to generate all fields automatically:

``` python
table_schema = sqlalchemy.SQLAlchemyFieldsSchema(model=User)
```

## Override specific fields

Pass extra fields to the constructor to override or add to auto-generated ones:

``` python
table_filters = sqlalchemy.SQLAlchemyFieldsSchema(
    model=User,
    created_at=schema.DateTimeField(range=True),
    extra_kwargs={
        'last_login': {'range': True},
    },
)
```

## list_display

Controls which fields are shown and in what order. Works the same as in [FieldsSchema](/fields_schema/fields_schema#list_display).

## SQLAlchemyRelatedField

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

When `__search_fields__` is defined, the autocomplete input will support search operators (see [Search](/integrations/sqlalchemy/tables#search)).
