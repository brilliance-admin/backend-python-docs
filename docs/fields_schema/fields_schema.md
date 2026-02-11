# FieldsSchema

`FieldsSchema` defines fields for table columns, filters, and action forms. 

Can be used as a class or as an instance.

## As a class

Define fields as class attributes. 
``` python
from brilliance_admin import schema
from brilliance_admin.translations import TranslateText as _


class PaymentSchema(schema.FieldsSchema):
    id = schema.IntegerField(label='ID', read_only=True)
    amount = schema.IntegerField(label=_('amount'))
    endpoint = schema.StringField(label=_('endpoint'))
    description = schema.StringField(label=_('description'))
    created_at = schema.DateTimeField(label=_('created_at'), read_only=True)

    list_display = [
        'id',
        'amount',
        'endpoint',
        'description',
        'created_at',
    ]
```

## As an instance

Pass fields directly to the constructor. Useful for simple schemas like action forms or filters.
``` python
form_schema = schema.FieldsSchema(
    new_password=schema.StringField(label='New password', min_length=6),
    is_active=schema.BooleanField(label='Active'),
)
```

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

