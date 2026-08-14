# Django Auth integration

Ready-to-use JWT auth for Django models.

Parameters:

- `secret`
- `user_model`
- `pk_name` optional, default `id`
- `admin_field_name` optional, default `is_admin`
- `password_validator` optional, sync or async

```python
from brilliance_admin import schema, django


auth = django.DjangoJWTAdminAuthentication(
    secret='YOUR_JWT_SECRET',
    user_model=User,
    password_validator=lambda user, password: user.password == password,
)

admin_schema = schema.AdminSchema(
    ...,
    auth=auth,
)
```

Requirements for `user_model`:

- primary key field
- `username`
- admin flag field, default `is_admin`

For Django built-in auth models, this also works:

```python
auth = django.DjangoJWTAdminAuthentication(
    secret=settings.SECRET_KEY,
    user_model=User,
    admin_field_name="is_staff",
    password_validator=lambda user, password: user.check_password(password),
)
```

::: warning
PyJWT is required.

`pip install pyjwt`
:::
