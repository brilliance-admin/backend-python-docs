``` python
class FakeAdminAuthentication(AdminAuthentication):
    async def login(self, data: AuthData) -> AuthResult:
        if data.username != 'admin' or data.password != 'admin':
            raise AdminAPIException(APIError(code='user_not_found'), status_code=401)

        return AuthResult(token='test', user=UserResult(username='test_admin'))

    async def authenticate(self, headers: dict) -> UserABC:
        return UserABC(username='test_admin')
```
