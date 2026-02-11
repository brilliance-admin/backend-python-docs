# How to start

To launch the admin panel you need to:

1. [Install the package](#installation)
2. [Describe your `AdminSchema` schema](#create-adminschema-instance) (tables, groups, authentication etc)
3. [Mount it to ASGI app](#integration-with-asgi-frameworks) to your backend

## Installation

To get started, install the `brilliance-admin` package using any package manager:

``` shell
pip install brilliance-admin
```

## Create `AdminSchema` instance

You need to generate `AdminSchema` (see [AdminSchema](/admin-schema/main)) instance:
``` python
from brilliance_admin import schema

# SQLAlchemy example
class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    model = User

admin_schema = schema.AdminSchema(
    title='Admin Panel',
    auth=YourAdminAuthentication(),
    groups=[
        schema.Group(slug='example', categories=[UserAdmin()]),
    ],
)

admin_app = admin_schema.generate_app()
```

After that you need to plug it to ASGI server.

## Integration with ASGI frameworks

### FastAPI

``` python
from fastapi import FastAPI
from your_project.admin import admin_app

app = FastAPI()
app.mount('/admin', admin_app)
```

An example of integration with FastAPI can be found [here](https://github.com/brilliance-admin/backend-python/blob/main/example/main.py).


### Starlette

``` python
from starlette.applications import Starlette
from starlette.routing import Mount

from your_project.admin import admin_app

app = Starlette(
    routes=[
        Mount('/admin', admin_app),
    ],
)
```

### LightStar

``` python
from lightstar import LightStar, Mount
from your_project.admin import admin_app

app = LightStar(
    routes=[
        Mount('/admin', admin_app),
    ],
)
```

### Django ASGI

Can work with `uvicorn`, `daphne`, `hypercorn`

**asgi.py**
``` python
import os
from django.core.asgi import get_asgi_application
from your_project.admin import admin_app

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

django_app = get_asgi_application()


async def application(scope, receive, send):
    if scope['type'] == 'http' and scope.get('path', '').startswith('/admin'):
        await admin_app(scope, receive, send)
        return

    await django_app(scope, receive, send)
```
