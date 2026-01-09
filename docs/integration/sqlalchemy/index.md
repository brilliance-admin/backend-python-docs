
## SQLAlchemy integration

Supports automatic schema generation for CRUD tables:

``` python
category = sqlalchemy.SQLAlchemyAdmin(db_async_session=async_sessionmaker, model=Terminal)
```

> [!NOTE]
> If `table_schema` is not specified, it will be generated automatically with all discovered fields and relationships

Now, the `category` instance can be passed to `categories`.

### DRF class style schema

``` python
from brilliance_admin import sqlalchemy
from brilliance_admin.translations import TranslateText as _

from your_project.models import Terminal


class TerminalFiltersSchema(sqlalchemy.SQLAlchemyFieldsSchema):
    model = Terminal
    fields = ['id', 'created_at']
    created_at = schema.DateTimeField(range=True)


class TerminalSchema(sqlalchemy.SQLAlchemyFieldsSchema):
    model = Terminal
    list_display = ['id', 'merchant_id']


class TerminalAdmin(sqlalchemy.SQLAlchemyAdmin):
    db_async_session = async_sessionmaker
    model = Terminal
    title = _('terminals')
    icon = 'mdi-console-network-outline'
    
    ordering_fields = ['id']
    search_fields = ['id', 'title']

    table_schema = TerminalSchema()
    table_filters = TerminalFiltersSchema()


category = TerminalAdmin()
```

### Can be used both via inheritance and instancing

Optionally, functional-style generation can be used to reduce boilerplate code

Availiable for `SQLAlchemyAdmin` and `SQLAlchemyFieldsSchema`

``` python
category = sqlalchemy.SQLAlchemyAdmin(
    db_async_session=async_sessionmaker,
    model=Terminal,

    table_schema = sqlalchemy.SQLAlchemyFieldsSchema(
        model=Terminal, 
        list_display=['id', 'merchant_id'],
    ),
    table_filters = sqlalchemy.SQLAlchemyFieldsSchema(
        model=Terminal, 
        fields=['id', 'created_at'],
        created_at=schema.DateTimeField(range=True),
    ),
)
```

### SQLAlchemy JWT Authentication

``` python
auth = sqlalchemy.SQLAlchemyJWTAdminAuthentication(
    secret='auth_secret',
    db_async_session=async_session,
    user_model=User,
)
```
