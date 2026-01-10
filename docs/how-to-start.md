# How to start

todo

## Installation

To get started, install the `brilliance-admin` package using any package manager:

``` shell
pip install brilliance-admin
```

## Create `AdminSchema` instance

You need to generate `AdminSchema` instance:
``` python
from brilliance_admin import schema


class CategoryExample(schema.CategoryTable):
    "Implementation of get_list and retrieve; update and create are optional"


admin_schema = schema.AdminSchema(
    title='Admin Panel',
    auth=YourAdminAuthentication(),
    groups=[
        schema.Group(
            slug='example',
            categories=[
                CategoryExample(),
            ]
        ),
    ],
)

admin_app = admin_schema.generate_app()
```

After that you need to add it to any ASGI server, so that this API can be acually used.

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

``` python
# asgi.py

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
