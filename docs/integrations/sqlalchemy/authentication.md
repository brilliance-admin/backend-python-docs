# SQLAlchemy Auth integration

Ready-to-use authentication with JWT tokens. Handles token generation, user lookup by primary key, and `is_admin` field check automatically.

You only need to provide:

- `secret` - JWT secret key
- `db_async_session` - SQLAlchemy async session factory
- `user_model` - your SQLAlchemy user model (must have `username`, `is_admin` fields)
- `password_validator` - async or sync function that takes `(user, password)` and returns `bool`

::: warning
PyJWT library is required

`pip install PyJWT`

Be careful, not `jwt`. These are different packages — installing `jwt` will cause import errors.
:::

``` python
from brilliance_admin import schema, sqlalchemy
from app.your_models import User, UserDAO


# Your way to verify password
async def password_validator(user: User, password: str) -> bool:
    return await UserDAO.verify_password(plain_password=password, hashed_password=user.password)


auth = sqlalchemy.SQLAlchemyJWTAdminAuthentication(
    secret='YOUR_JWT_SECRET',
    db_async_session=auth_db.async_session,
    user_model=User,
    password_validator=password_validator,
)


admin_schema = schema.AdminSchema(
    ...
    auth=auth,
)
```

::: tip
`password_validator` can also be a sync function (lambda) or a sync:
``` python
password_validator=lambda user, pwd: verify_password(pwd, user.hashed_password)
```
:::
