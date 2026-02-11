# Customization

All customization is done from Python code: how to display data and where to get it from. \
If the desired customization is not available out of the box, you can modify the frontend and use your own version, but the goal is to cover all common use cases so that there will be no need for that.

::: tip
If you have ideas on what should be covered, I'd be happy to hear them in an issue.
:::

The frontend runs on a pre-built frontend - [Repo Vue3 + Vuetify](https://github.com/brilliance-admin/frontend). \
The project does not use templates, except for one that renders this frontend.

## Custom frontend

If the built-in customization options are not enough, you can fork and build your own frontend. \
Clone the [frontend repository](https://github.com/brilliance-admin/frontend), make your changes, build the project, and point Brilliance Admin to your custom static files using the `static_prefix` parameter in `AdminSchema`.
``` python
admin_schema = schema.AdminSchema(
    title='My Admin',
    auth=auth,
    categories=[...],
    static_prefix='https://cdn.example.com/admin-static/',
)
```
