from brilliance_admin import schema

admin_schema = schema.AdminSchema(
    title='Admin Panel',
    auth=YourAdminAuthentication(),
    categories=[
        schema.CategoryGroup(
            slug='example',
            subcategories=[YourCategory()],
        ),
    ],
)
admin_app = admin_schema.generate_app()
