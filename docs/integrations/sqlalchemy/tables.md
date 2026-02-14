# SQLAlchemy Tables

Built-in integration with SQLAlchemy for tables with automatic CRUD, filtering, and autocomplete.

## SQLAlchemyAdmin

Drop-in replacement for `CategoryTable` that handles `get_list`, `retrieve`, `create`, `update` and `autocomplete` automatically based on a SQLAlchemy model.

``` python
from brilliance_admin import schema, sqlalchemy
from brilliance_admin.translations import TranslateText as _

from myapp.models import User
from myapp.database import db


class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    slug = 'users'
    title = _('users')
    icon = 'mdi-account-details'

    search_fields = ['username', 'email']
    ordering_fields = ['id', 'created_at']
    default_ordering = '-id'

    table_schema = sqlalchemy.SQLAlchemyFieldsSchema(model=User)
    table_filters = sqlalchemy.SQLAlchemyFieldsSchema(
        model=User,
        created_at=schema.DateTimeField(range=True),
    )
```

| Parameter | Description |
|-----------|-------------|
| `model` <Badge type="danger" text="required" /> | SQLAlchemy model class |
| `db_async_session` <Badge type="danger" text="required" /> | Async session factory (`async_sessionmaker`) |
| `search_fields` | List of model column names to search in (enables `search_enabled` automatically) |

All other parameters are inherited from [CategoryTable](/admin-schema/tables) — `slug`, `title`, `icon`, `ordering_fields`, etc.


## Search

Tables and autocomplete fields support text search with operators for flexible querying:

| Operator | Description | Example | Matches |
|----------|-------------|---------|---------|
| `"text"` | Exact match | `"Chrome"` | `Chrome` but not `Chrome Mobile` |
| `%` | Any sequence of characters | `%fire%` | `Firefox`, `Firebird` |
| `_` | Any single character | `19_.168.1.1` | `192.168.1.1`, `193.168.1.1` |

All search is case-insensitive.

### Search Example

| Input | What it finds |
|-------|---------------|
| `Moscow` | Records where any search field equals `Moscow` |
| `%Moscow%` | Records containing `Moscow` anywhere in the field |
| `"127.0.0.1"` | Exact match for `127.0.0.1` |
| `192.168.%` | IP addresses starting with `192.168.` |
| `Chr_me` | Matches `Chrome`, `Chrme` would not match (wrong length) |

### Auto-detected defaults

Several parameters are resolved automatically if not set explicitly:

- `slug` — lowercased model name (`User` → `users`)
- `pk_name` — detected from the model's primary key column
- `default_ordering` — `-{pk_name}` (descending by primary key)
- `search_enabled` — set to `True` when `search_fields` is not empty
- `search_help` — auto-generated from `search_fields` list
- `table_schema` — auto-generated `SQLAlchemyFieldsSchema` from `model` if not provided

## CRUD operations

All CRUD methods are implemented automatically and can be toggled or overridden.

### Disabling operations

Set `has_create`, `has_update`, `has_retrieve`, or `has_delete` to `False` to disable specific operations. 

The corresponding UI buttons will be hidden.

``` python
class ReadOnlyAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    has_create = False
    has_update = False
    has_delete = False
```

### Overriding operations

Override any CRUD method for custom behavior. The method signature stays the same:

``` python
class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    async def create(self, data, user, language_context, admin_schema) -> schema.CreateResult:
        # custom logic before create
        data['created_by'] = user.username
        return await super().create(data, user, language_context, admin_schema)
```

### Delete action

Delete is implemented as a built-in `@admin_action` with a confirmation dialog. It appears as a red outlined button in the actions bar. Disable it with `has_delete = False`.

## Queryset

`get_queryset()` returns the base SQLAlchemy `select` statement used for `get_list` and `retrieve`. It automatically applies `selectinload('*')` and eager-loads all related fields from `table_schema`.

Override it to add custom joins, filters, or load options:

``` python
class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    def get_queryset(self):
        stmt = super().get_queryset()
        # only show active users
        return stmt.where(User.is_active == True)
```

## Filtering

Filters are applied automatically from `table_filters`. Filter behavior depends on the field type:

| Field type | Filter behavior |
|------------|-----------------|
| `DateTimeField` with `range=True` | Filters by date range (`from` / `to`) |
| `list` value | `WHERE column IN (...)` |
| `str` value | `WHERE column LIKE ...` |
| `RelatedField` with `many=False` | `WHERE relationship.has(pk == value)` |
| `RelatedField` with `many=True` | `WHERE relationship.any(pk.in_(values))` |
| Other | `WHERE column == value` |

Custom filter logic can be added by implementing `apply_filter` on a field:

``` python
class ILikeStringField(schema.StringField):
    async def apply_filter(self, stmt, value, model, column):
        return stmt.where(column.ilike(f'%{value}%'))
```

## Ordering

Columns listed in `ordering_fields` become sortable in the table header. Users can click column headers to sort.

Prefix `default_ordering` with `-` for descending order:

``` python
class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    ordering_fields = ['id', 'username', 'created_at']
    default_ordering = '-created_at'
```

## Pagination

List results are paginated automatically. The default page size is 25, with a maximum of 150 rows per page.

## Validation

`SQLAlchemyAdmin` validates configuration at initialization:

- All `search_fields` must exist as columns on the model
- All `ordering_fields` must exist as columns on the model
- `table_schema` must be an instance of `SQLAlchemyFieldsSchema`
- `model` and `db_async_session` are required

Invalid configuration raises `AttributeError` at startup, not at runtime.

## Full example

``` python
from brilliance_admin import schema, sqlalchemy
from brilliance_admin.translations import TranslateText as _

from myapp.models import User
from myapp.database import db


class UserSchema(sqlalchemy.SQLAlchemyFieldsSchema):
    model = User

    @schema.function_field(label=_('full_name'))
    async def get_full_name(self, record, user, **kwargs):
        return f"{record.first_name} {record.last_name}"

    list_display = ['id', 'username', 'email', 'get_full_name', 'is_active']


class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User
    db_async_session = db.async_session

    slug = 'users'
    title = _('users')
    icon = 'mdi-account-details'

    search_fields = ['username', 'email']
    ordering_fields = ['id', 'created_at']

    table_schema = UserSchema()
    table_filters = sqlalchemy.SQLAlchemyFieldsSchema(
        model=User,
        created_at=schema.DateTimeField(range=True),
        is_active=schema.BooleanField(),
    )
```
