class UserAdmin(sqlalchemy.SQLAlchemyAdmin):
    ...
    @admin_action(
        title=_('password.change_password'),
        form_schema=schema.FieldsSchema(
            new_password=schema.StringField(label=_('password.new_password'), min_length=6, password=True)
        ),
    )
    async def change_password(self, action_data: ActionData):
        return ActionResult(message=ActionMessage(_('password.password_changed')))
