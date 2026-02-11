# Main Admin Panel schema

- `brilliance_admin.schema.AdminSchema`

It is the main configuration object that describes the entire admin panel: title, authentication, groups and categories (tables, dashboards, links etc). 

## Main config

| Parameter | Description |
|-----------|-------------|
| `categories` <Badge type="danger" text="required" /> | List of root categories (tables, dashboards, links) displayed in the sidebar |
| `auth` <Badge type="danger" text="required" /> | Authentication provider ([see Authentication](/authentication)) |
| `language_manager` | i18n configuration ([see Translations](/translations)) |

### Info

| Parameter | Description |
|-----------|-------------|
| `title` | Admin panel title, shown in the navbar and browser tab |
| `description` | Panel description |
| `login_greetings_message` | Message displayed on the login page |

### Customization

| Parameter | Description |
|-----------|-------------|
| `favicon_image` | URL to the favicon |
| `logo_image` | URL to the logo image in the navbar |
| `navbar_density` | Sidebar density: `'default'`, `'comfortable'` or `'compact'` |
| `default_theme` | Default color theme name |
| `custom_themes` | List of custom color theme objects |

### Urls

| Parameter | Description |
|-----------|-------------|
| `main_page` | Redirect path after login and when clicking the logo (e.g. `'/group/category'`) |
| `backend_prefix` | Custom backend URL prefix (auto-detected if not set) |
| `static_prefix` | Custom static files URL prefix (auto-detected if not set) |

## Usage
``` python
from brilliance_admin import schema

admin_schema = schema.AdminSchema(
    title='My Admin Panel',
    auth=your_auth,
    categories=[
        YourDashboard(),
        YourTableCategory(),
    ],
    language_manager=schema.LanguageManager(
        languages={'en': 'English', 'ru': 'Russian'},
        locales_dir='locales',
    ),
)

admin_app = admin_schema.generate_app()
```

## generate_app()

Generates a FastAPI ASGI application. Mount it to your backend at any path.

Optional arguments:

- `debug` - enable debug mode
- `default_cors` - add CORS middleware (enabled by default)
- `include_docs` - enable Swagger UI at `/docs`
- `include_scalar` - enable Scalar docs
- `include_redoc` - enable ReDoc
``` python
admin_app = admin_schema.generate_app(
    debug=True,
    include_docs=True,
)
```

::: tip
All string parameters (`title`, `description`, `login_greetings_message`) support `TranslateText` for i18n.
:::
