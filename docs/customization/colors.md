# Colors & Themes

Brilliance Admin comes with built-in light and dark themes. You can also create custom themes to match your brand.

## Built-in themes

Several themes are available out of the box. Set `default_theme` in `AdminSchema` to choose the default:

``` python
admin_schema = schema.AdminSchema(
    title='My Admin',
    auth=auth,
    categories=[...],
    default_theme='deepPurpleDark',
)
```

Users can switch themes from the UI at any time.

## Custom themes

Pass a list of theme objects to `custom_themes`. Each theme requires a `name`, `dark` flag, and a `colors` dict.

``` python
custom_themes = [
    {
        "name": "pinkLight",
        "dark": False,
        "colors": {
            "light2": "#FBF5F7",
            "light3": "#E8D0D8",
            "secondary": "#C4A0AE",
            "darken1": "#A88392",
            "primary": "#D46B8A",
            "darken3": "#6B4458",
            "darken4": "#4A2E3D",
            "accent": "#D4A9B8",
            "error": "#C26161",
            "info": "#7BA4C9",
            "success": "#7BAF7F",
            "warning": "#C9A84E",
        },
    },
    {
        "name": "pinkDark",
        "dark": True,
        "colors": {
            "surface": "#160D12",
            "on-surface": "#F0E0E8",
            "light2": "#2E1825",
            "light3": "#E8A0B8",
            "secondary": "#5C3350",
            "darken1": "#D4789A",
            "primary": "#D46B8A",
            "on-primary": "#FFFFFF",
            "darken3": "#421E35",
            "darken4": "#0E0609",
            "accent": "#D4A9B8",
            "error": "#C26161",
            "info": "#7BA4C9",
            "success": "#7BAF7F",
            "warning": "#C9A84E",
        },
    },
]

admin_schema = schema.AdminSchema(
    title='My Admin',
    auth=auth,
    categories=[...],
    default_theme='pinkDark',
    custom_themes=custom_themes,
)
```

## Theme object

| Parameter | Description |
|-----------|-------------|
| `name` <Badge type="danger" text="required" /> | Unique theme name (used in `default_theme`) |
| `dark` <Badge type="danger" text="required" /> | `True` for dark theme, `False` for light |
| `colors` <Badge type="danger" text="required" /> | Dict of color overrides |

## Colors

Colors are passed directly to [Vuetify theme](https://vuetifyjs.com/en/styles/colors/#material-colors). The main color keys:

| Color | Usage |
|-------|-------|
| `primary` | Buttons, active elements, links |
| `secondary` | Secondary buttons, sidebar active state |
| `accent` | Highlights, badges |
| `surface` | Card and component backgrounds (dark themes) |
| `on-surface` | Text color on surface (dark themes) |
| `on-primary` | Text color on primary background |
| `light2` | Light background areas |
| `light3` | Borders, dividers |
| `darken1` | Muted primary variant |
| `darken3` | Dark sidebar / navigation |
| `darken4` | Darkest background areas |
| `error` | Error messages, destructive actions |
| `info` | Info alerts, badges |
| `success` | Success messages, positive indicators |
| `warning` | Warning messages, caution indicators |

::: tip
Create themes in pairs — one light and one dark with the same color palette. Users can switch between them from the theme picker in the UI.
:::
