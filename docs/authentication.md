# Authentication

<div class="img-preview">
  <img src="/login-black.png" />
</div>

Brilliance Admin provides a built-in auth system. There are several ways to set up authentication:

1. [Implement your own authentication](#adminauthentication-implementation)
2. [Use SQLAlchemy integration](#sqlalchemy-integration) with JWT tokens
3. Integrate OAuth (planned)

## AdminAuthentication implementation

- `brilliance_admin.auth.AdminAuthentication`

Brilliance Admin has a built-in login page. To make it work, you need to implement two methods:

- `login` - validates credentials and returns a token
- `authenticate` - validates the token from request headers and returns a user object

You can use any data source for authentication: database, external API, LDAP, etc. Pass the `auth` instance to `AdminSchema`.


### Fake implementation example
``` python
from brilliance_admin.auth import AdminAuthentication, AuthData, AuthResult, UserABC, UserResult


class FakeAdminAuthentication(AdminAuthentication):
    async def login(self, data: AuthData) -> AuthResult:
        if data.username != 'admin' or data.password != 'admin':
            raise AdminAPIException(APIError(code='user_not_found'), status_code=401)

        return AuthResult(token='test', user=UserResult(username='test_admin'))

    async def authenticate(self, headers: dict) -> UserABC:
        return UserABC(username='test_admin')
```

## SQLAlchemy integration

Ready-to-use authentication with JWT tokens. Handles token generation, user lookup by primary key, and `is_admin` field check automatically.

You only need to provide:

- `secret` - JWT secret key
- `db_async_session` - SQLAlchemy async session factory
- `user_model` - your SQLAlchemy user model (must have `username`, `is_admin` fields)
- `password_validator` - async or sync function that takes `(user, password)` and returns `bool`

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
