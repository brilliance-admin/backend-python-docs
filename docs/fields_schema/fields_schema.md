# FieldsSchema

`brilliance_admin.schema.FieldsSchema` defines fields for table columns, filters, and action forms. 

| Attribute | Description |
|-----------|-------------|
| `fields` | List of field slugs included in the schema |
| `list_display` | Fields displayed as table columns |
| `readonly_fields` | Fields marked as read-only |
| `exclude_fields` | Fields excluded from the schema |
| `extra_kwargs` | Override attributes on generated fields |

## Can be used as a class or as an instance.

### As a class

Define fields as class attributes. 
``` python
from brilliance_admin import schema

class PaymentSchema(schema.FieldsSchema):
    id = schema.IntegerField(label='ID', read_only=True)
    amount = schema.IntegerField()

    list_display = [
        'id',
        'amount',
    ]
```

### As an instance

Pass fields directly to the constructor. Useful for simple schemas like action forms or filters.
``` python
form_schema = schema.FieldsSchema(
    new_password=schema.StringField(label='New password', min_length=6),
    is_active=schema.BooleanField(label='Active'),
)
```

## Field validation

Define `validate_<field_name>` methods for custom field validation. Raise `FieldError` to reject the value.
``` python
from brilliance_admin.exceptions import FieldError


class CreatePaymentSchema(schema.FieldsSchema):
    amount = schema.IntegerField(label='Amount')

    async def validate_amount(self, value):
        if value <= 0:
            raise FieldError('Amount must be positive')
        return value
```

## fields

List of field slugs included in the schema. Defines the complete set of fields and their order.

- Type: `List[str] | None`
- Default: `None` (auto-populated with all discovered fields)

```python
class TerminalSchema(FieldsSchema):
    fields = ['title', 'description', 'status', 'merchant_id', 'currency_id']
```

If not specified, the list is automatically built from all `TableField` subclass attributes found on the class.

## list_display

Controls which fields are shown in the table and in what order. 

Only applies to `table_schema` in `CategoryTable`.

If not set, all fields are displayed.

``` python
class UserSchema(schema.FieldsSchema):
    id = schema.IntegerField(label='ID')
    username = schema.StringField(label='Username')
    email = schema.StringField(label='Email')
    internal_note = schema.StringField(label='Note')

    # only these fields will appear in the table, in this order
    list_display = ['id', 'username', 'email']
```

## readonly_fields

Pass a list of field names to force them as `read_only` at initialization.
``` python
table_schema = PaymentSchema(readonly_fields=['amount', 'endpoint'])
```

## exclude_fields

List of field slugs to exclude from the schema. Fields in this list will not be added even if they appear in `fields`.

- Type: `List[str] | None`
- Default: `None`

```python
class TerminalSchema(FieldsSchema):
    exclude_fields = ['internal_code', 'legacy_field']
```

## extra_kwargs

Dictionary for overriding attributes on already generated fields. \
Key is the field slug, value is a dict of `{attribute_name: value}`.

Applied after field generation, allowing to change any attrubutes without recreating whole field.

```python
class TerminalSchema(FieldsSchema):
    extra_kwargs = {
        'title': {'required': True, 'max_length': 100},
        'status': {'read_only': True},
        'description': {'label': 'Notes', 'help_text': 'Optional notes'},
        'terminals': {'filter_fn': terminals_filter}
    }
```
