# SQLAlchemy Fields

`sqlalchemy.SQLAlchemyFieldsSchema` auto-generates fields from a SQLAlchemy model. Use it as `table_schema` or `table_filters` in [SQLAlchemyAdmin](/integrations/sqlalchemy/table_schema).

Replacement for [FieldsSchema](/fields_schema/fields_schema) that reads column types from the model and creates matching fields automatically.

| Parameter | Description |
|-----------|-------------|
| `model` <Badge type="danger" text="required" /> | SQLAlchemy model class |

**Auto-generated schema**

If no `fields` list is set, all columns and relationships from the model will be included.
``` python
table_schema = sqlalchemy.SQLAlchemyFieldsSchema(model=User)
```

**Type mapping**

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

## Model Column info

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

| key | Description |
|------------|-------------|
| `label` | Display name for the field |
| `help_text` | Tooltip text |
| `choices` | Enum class — renders as `ChoiceField` |


::: tip
For example of enum choice see [ChoiceField](/fields_schema/table_fields#choicefield)
:::
