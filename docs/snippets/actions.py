class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    ...
    @admin_action(
        title=_('change_password'),
        form_schema=schema.FieldsSchema(
            new_password=schema.StringField()
        ),
    )
    async def change_password(self, action_data: ActionData):
        return ActionResult(_('password_changed'))
