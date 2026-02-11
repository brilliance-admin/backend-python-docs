# Translations

Brilliance Admin has built-in i18n support. All user-facing text in the admin panel can be translated.

## TranslateText

Use `TranslateText` (aliased as `_`) to mark strings for translation. \
The actual translation happens at render time based on the current user's language.
``` python
from brilliance_admin.translations import TranslateText as _

title = _('dashboard.title')
```

### String interpolation

Use `%` operator with a dict to insert dynamic values:
``` python
message = _('greeting') % {'name': 'John'}
```

This will look up the `greeting` key in the translation file and substitute `{name}` with `John`.

## LanguageManager

`LanguageManager` loads translation files and resolves text for the current language. It is configured in [AdminSchema](/admin-schema/main).
``` python
from brilliance_admin.translations import LanguageManager

language_manager = LanguageManager(
    languages={'en': 'English', 'ru': 'Russian'},
    locales_dir='path/to/your/locales',
)

admin_schema = schema.AdminSchema(
    ...
    language_manager=language_manager,
)
```

::: tip
The first language in the `languages` dict is used as the default and fallback language. 

If a translation is missing for the current language, the first language's translation will be used.
:::

Built-in translations (for UI elements like buttons, errors, etc.) are loaded automatically. \
If you provide a `locales_dir`, your custom translations will be loaded on top.

## Translation files

Translation files are YAML files placed in your `locales_dir`, one per language:
```
locales/
  en.yaml
  ru.yaml
```

Example `en.yaml`:
``` yaml
dashboard:
  title: 'Dashboard'
greeting: 'Hello, %(name)s!'
```

Example `ru.yaml`:
``` yaml
dashboard:
  title: 'Панель управления'
greeting: 'Привет, %(name)s!'
```

::: tip
Keys are dot-separated in code (`_('dashboard.title')`) and nested in YAML files.
:::
