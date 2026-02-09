from brilliance_admin import schema

admin_schema = schema.AdminSchema(
    title='Admin Panel',
    auth=YourAdminAuthentication(),
    groups=[
        schema.Group(slug='example', categories=[YourCategory()]),
    ],
)
admin_app = admin_schema.generate_app()
